import { supabase } from "../lib/supabaseClient";
import { uploadImage } from "../utils/uploadImage";
export const cacheKey = "/supabase/blog";


export const getPosts = async () => {
  const {data, error, status} = await supabase 
  .from("tb_post")
  .select(`*`);

  return {data, error, status};
};

export const getPost = async ({slug}) => {
  const {data, error, status} = await supabase
  .from("tb_post")
  .select(`*`)
  .single()
  .eq("slug", slug);

  return {data, error, status}
}

export const removePost = async (_, {arg: id}) => {
  const {error, status} = await supabase
  .from('tb_post')
  .delete()
  .eq('id', id);

  return {error, status}
};

export const addPost = async (_, {arg: newPost}) => {

  let image ="";
  
  if(newPost?.image) {
    const {publicUrl, error } = await uploadImage(newPost?.image);

    if(!error) {
      image = publicUrl;
    }

    //create function that takes in the uploades image from the client
    //upload it to our bucket
    //get the public url and return it
  }
  const {data, error, status } = await supabase
  .from('tb_post')
  .insert({...newPost, image})
  .select()
  .single();
  console.log({data, error});
  return { data, error, status };
};

export const editPost = async (_, {arg: editedPost}) => {
  let image = editedPost?.image ?? "";

  const isNewImage = typeof image === "object" && image !== null;
  console.log(image)
  if(isNewImage) {
    const {publicUrl, error} = await uploadImage(editedPost?.image);

    if(!error) {
      image = publicUrl;
    }
  }
  const {data, error, status} = await supabase
  .from('tb_post')
  .update({...editedPost, image})
  .select()
  .single()
  .eq("id", editedPost.id)
  return {data, error, status};
};
