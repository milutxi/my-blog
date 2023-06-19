import { supabase } from "../lib/supabaseClient";


export const getComments = async ({postId}) => {
  const {data, error, status} = await supabase
  .from("tb_comments")
  .select(`*`)
  .eq("fk_post_id", postId)

  return {data, error, status}
  //Handle get all comments
};

export const addComment = async (_, {arg: newComment}) => {
  const {data, error, status} = await supabase
  .from("tb_comments")
  .insert (newComment)
  .select()
  .single();
  
  return{data, error, status};
  //Handle add comment here
};

export const removeComment = () => {
  //Handle remove comment here
};
