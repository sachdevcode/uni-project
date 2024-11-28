'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DeviceFrameset } from 'react-device-frameset';
import 'react-device-frameset/styles/marvel-devices.min.css';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileUploader } from '@/components/file-uploader';
import { useTheme } from 'next-themes';
import { MultiSelectProduct } from '@/components/multiple-product';
import { createStories } from '@/service/stories';
import { useRouter } from 'next/navigation';
import { ENDPOINT_BASE_URL, MAX_VIDEO_SIZE, Product } from '@/utils/constant';
import { fetchSingleStory } from '@/service/singleStories';
import { getVideoFromUrl } from '@/utils/utils';
import { formSchema } from '@/lib/form-schema';
import { z } from 'zod';
import { toast } from 'sonner';


interface PropTypes {
  title: string;
  id?: string;
  type: "create" | "update";
}
export default function StoriesForm({ title,id, type }: PropTypes) {
  const { theme } = useTheme();
  const [videoPreview, setVideoPreview] = React.useState<string | null>(null);
  const [story,setStory] = React.useState<z.infer<typeof formSchema>>()
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      video:   undefined,
      title: '',
      products:  [],
      description:  ''
    }
  });

  console.log(form.formState.errors, "error")

  const getStory = async(storyId: string)=> {
    const response = await fetchSingleStory(storyId)

    setStory(response?.story || {});
    return response
  }

  const storyId = async(id : string) => {
    try {
     const res = await getStory(id)
     console.log(res, "res")
     if (res ) {
      console.log(res)
       const story = await getVideoFromUrl(res?.story?.video?.url);
       console.log(story, "story file");
       setVideoPreview(`${ENDPOINT_BASE_URL}/api${res?.story?.video?.url}`)
       form.reset({
        title: res.story.title || '',
        video: [story],
        products: res.story.products || [],
        description: res.story.description || ''
      });
     }
       
    } catch (error) {
      console.log(error)
    }
  }
console.log(form.formState)

  React.useEffect(() => {
    if (type == "update" && id) {
      (async()=>{  
       await storyId(id)
      })();
    }
  }, [id]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const productIds = values.products.map((curElm: any) => {
      return curElm.id;
    });

    const dataToSubmit = {
      ...values,
      product: productIds,
      type: 'shoppable'
    };
    if (id && type == "update") {
      createStories(dataToSubmit, type, id).then((response) => {
        if (response) {
          toast.success("successfully update");
           router.push('/dashboard/stories')
          console.log('Story created successfully:', response);
        }
      }).catch((error)=> {
          toast.error("failed to update")
      });

    }else {
      createStories(dataToSubmit).then((response) => {
        if (response) {
          toast.success("successfully Created");
           router.push('/dashboard/stories')
          console.log('Story created successfully:', response);
        }
      }).catch((err)=> {
          toast.error('Failed to create')
      });
    }
  }

  const handleVideoUpload: React.Dispatch<React.SetStateAction<File[]>> = (
    value
  ) => {
    const files = typeof value === 'function' ? value([]) : value;
    if (files?.length > 0) {
      const file = files[0];
      const videoURL = URL.createObjectURL(file);
      setVideoPreview(videoURL);
      form.setValue('video', files);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <Card className="mx-auto w-full">
        <CardHeader>
          <CardTitle className="text-left text-2xl font-bold">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <div className="space-y-6">
                    <FormItem className="w-full">
                      <FormLabel>Upload Video</FormLabel>
                      <FormControl>
                        <FileUploader
                          value={field.value}
                          onValueChange={handleVideoUpload}
                          maxFiles={1}
                          maxSize={MAX_VIDEO_SIZE}
                          removeFile={() => {
                            setVideoPreview(null);
                            form.setValue('video', null);
                          }}
                          
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Story Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter story name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="products"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Products</FormLabel>
                      <MultiSelectProduct
                        title="Categories"
                        options={Product}
                        selectedValues={field.value as any}
                        setSelectedValues={(values: any) => {
                          field.onChange(values);
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter product description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">{type == "create" ? "Add " : "Update"} Story</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="flex w-full justify-center">
        <DeviceFrameset
          device="iPhone 8"
          color={theme === 'dark' ? 'black' : 'gold'}
          height={600}
        >
          {videoPreview ? (
            <video
              src={videoPreview}
              autoPlay={true}
              loop={true}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-center">
              <p>No video uploaded</p>
            </div>
          )}
        </DeviceFrameset>
      </div>
    </div>
  );
}
