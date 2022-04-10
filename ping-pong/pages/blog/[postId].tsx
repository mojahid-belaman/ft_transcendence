import React from 'react'

function PostItem(props: any) {
  return (
    <>
        <div>
            <h2>{props.postId.id} {props.postId.title}</h2>
            <p>{props.postId.body}</p>
        </div>
    </>
  )
}

export default PostItem

export async function getStaticProps(context:any) {


    console.log(context);
    const {prop} = context;

    const responce = await fetch(`https://jsonplaceholder.typicode.com/posts/${prop.postId}`);

    return ( {
        props: {
            postId: responce
        }
    } )
}