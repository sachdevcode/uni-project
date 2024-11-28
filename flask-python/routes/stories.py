from datetime import datetime
import uuid
from flask import Blueprint, current_app, request, jsonify
from flask_jwt_extended import jwt_required
from models import Product, db, Stories, Video
from schemas import StorySchema
from sqlalchemy.exc import SQLAlchemyError
import os
from werkzeug.utils import secure_filename

stories_bp = Blueprint('stories', __name__)
stories_schema = StorySchema()
stories_list_schema = StorySchema(many=True)

@stories_bp.route('/stories', methods=['GET'])
@jwt_required()
def get_all_stories():
    try:
        stories = Stories.query.all()
        story_list = []
        for story in stories:
            story_data = {
                "id": story.id,
                "title": story.title,
                "description": story.description,
                "type": story.type,
                "video": {
                    "id": story.video.id,
                    "url": story.video.url,
                    "mux_playback_id": story.video.mux_playback_id,
                } if story.video else None,
                "products": [
                    {"id": product.id, "name": product.name, "price": product.price}
                    for product in story.products
                ] if story.products else []
            }
            story_list.append(story_data)
        return jsonify({"stories": story_list}), 200
    except SQLAlchemyError as db_error:
        return jsonify({"message": "Database operation failed", "error": str(db_error)}), 500
    except Exception as e:
        return jsonify({"message": "An unexpected error occurred", "error": str(e)}), 500


@stories_bp.route('/stories/<int:story_id>', methods=['GET'])
def get_story_by_id(story_id):
    try:
        story = Stories.query.get_or_404(story_id)
        story_data = {
            "id": story.id,
            "title": story.title,
            "description": story.description,
            "type": story.type,
            "video": {
                "id": story.video.id,
                "url": story.video.url,
                "mux_playback_id": story.video.mux_playback_id,
            } if story.video else None,
            "products": [
                {"id": product.id, "name": product.name, "price": product.price, "description": product.description, "photo_url": product.photo_url}
                for product in story.products
            ] if story.products else []
        }
        return jsonify({"story": story_data}), 200
    except SQLAlchemyError as db_error:
        return jsonify({"message": "Database operation failed", "error": str(db_error)}), 500
    except Exception as e:
        return jsonify({"message": "An unexpected error occurred", "error": str(e)}), 500


@stories_bp.route('/stories', methods=['POST'])
@jwt_required()
def create_story():
    try:
        # Step 1: Validate request data
        data = request.form
        video_file = request.files.get('video_file')
        if not data.get('title') or not data.get('type'):
            return jsonify({"message": "Title and type are required"}), 400
        if not video_file:
            return jsonify({"message": "Video file is required"}), 400

        # Step 2: Save video file locally
        video_url = save_video_to_server(video_file)

        # Step 3: Create video and story objects
        video = Video(url=video_url, mux_playback_id=None)
        story = Stories(
            title=data['title'],
            description=data.get('description'),
            type=data['type'],
            video=video
        )

        # Additional type-specific validations
        if story.type == 'shoppable':
            product_ids = request.form.getlist('product_ids[]')
            if not product_ids:
                return jsonify({"message": "Product IDs are required for shoppable stories"}), 400

            products = Product.query.filter(Product.id.in_(product_ids)).all()
            if len(products) != len(product_ids):
                return jsonify({"message": "Some product IDs are invalid"}), 400

            story.products = products
        elif story.type == 'cta':
            cta_text = data.get('cta_text')
            cta_link = data.get('cta_link')
            if not cta_text or not cta_link:
                return jsonify({"message": "CTA stories require cta_text and cta_link"}), 400

            story.cta_text = cta_text
            story.cta_link = cta_link

        # Step 4: Save both objects in the same transaction
        save_to_db([video, story])

        return jsonify({"message": "Story created successfully", "story": story.id}), 201

    except SQLAlchemyError as db_error:
        db.session.rollback()
        return jsonify({"message": "Database operation failed", "error": str(db_error)}), 500
    except Exception as e:
        return jsonify({"message": "An unexpected error occurred", "error": str(e)}), 500


def save_to_db(instances):
    """
    Handles database save operations for multiple objects with proper exception handling.
    """
    try:
        if not isinstance(instances, list):
            instances = [instances]
        for instance in instances:
            db.session.add(instance)
        db.session.commit()
    except SQLAlchemyError as e:
        db.session.rollback()
        raise Exception(f"Database save failed: {str(e)}")



def save_video_to_server(video_file):
    """Saves the video file to the server with a unique name and returns its URL."""
    try:
        # Define the directory to save videos
        upload_dir = os.path.join(current_app.root_path, 'videos')
        os.makedirs(upload_dir, exist_ok=True)  # Create directory if it doesn't exist

        # Get the original file extension
        file_extension = os.path.splitext(video_file.filename)[1]

        # Generate a secure and unique filename
        unique_name = f"{datetime.utcnow().strftime('%Y%m%d%H%M%S')}_{uuid.uuid4().hex}{file_extension}"
        filename = secure_filename(unique_name)  # Ensure the name is safe
        file_path = os.path.join(upload_dir, filename)

        # Save the file to the defined path
        video_file.save(file_path)

        # Return the relative URL of the video
        return f"/videos/{filename}"
    except Exception as e:
        raise Exception(f"Failed to save video file: {str(e)}")

# This is for saving video in parent of root folder
# def save_video_to_server(video_file):
#     """Saves the video file to the parent directory of the backend folder and returns its URL."""
#     try:
#         # Define the directory to save videos in the parent folder
#         backend_root = current_app.root_path  # Current backend folder
#         parent_dir = os.path.dirname(backend_root)  # Parent directory of backend folder
#         upload_dir = os.path.join(parent_dir, 'videos')  # Create 'videos' folder in the parent directory
#         os.makedirs(upload_dir, exist_ok=True)  # Create directory if it doesn't exist

#         # Save the file with a secure name
#         filename = secure_filename(video_file.filename)
#         file_path = os.path.join(upload_dir, filename)
#         video_file.save(file_path)

#         # Return the relative URL of the video
#         return f"/videos/{filename}"
#     except Exception as e:
#         raise Exception(f"Failed to save video file: {str(e)}")



# Update a story
@stories_bp.route('/stories/<int:story_id>', methods=['PUT'])
@jwt_required()
def update_story(story_id):
    try:
        story = Stories.query.get_or_404(story_id)
        # data = request.json
        data = request.form
        video_file = request.files.get('video_file')
        if not data.get('title') or not data.get('type'):
            return jsonify({"message": "Title and type are required"}), 400

    # Update associated video if needed
        if video_file:
            video_url = save_video_to_server(video_file)
            story.video.url=video_url

        # Update basic story details
        story.title = data.get('title', story.title)
        story.description = data.get('description', story.description)
        story.type = data.get('type', story.type)


        # Update associated products
        if story.type == 'shoppable' and 'product_ids' in data:
            product_ids = data['product_ids']
            products = Product.query.filter(Product.id.in_(product_ids)).all()
            if len(products) != len(product_ids):
                raise ValueError("Some product IDs are invalid")
            story.products = products

        # Update CTA details
        if story.type == 'cta':
            story.cta_text = data.get('cta_text', story.cta_text)
            story.cta_link = data.get('cta_link', story.cta_link)

        # Save changes
        save_to_db(story)
        return jsonify({"message": "Story updated successfully"}), 200
    except SQLAlchemyError as db_error:
        return jsonify({"message": "Database operation failed", "error": str(db_error)}), 500
    except ValueError as ve:
        return jsonify({"message": str(ve)}), 400
    except Exception as e:
        return jsonify({"message": "An unexpected error occurred", "error": str(e)}), 500


# Delete a story
@stories_bp.route('/stories/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_story(id):
    story = Stories.query.get(id)
    if not story:
        return jsonify({"msg": "Story not found"}), 404
    db.session.delete(story)
    db.session.commit()
    return jsonify({"msg": "Story deleted"}), 200


