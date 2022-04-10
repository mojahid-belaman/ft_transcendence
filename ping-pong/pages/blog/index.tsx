import React from 'react'
import Link from 'next/link';

function ListPost(props:any) {
  return (
    <>
        <h1>List of posts</h1>
        {
            props.posts.map((post:any) => {
                return (
                    <div key={post.id}>
                        <Link href={`/blog/${post.id}`}>
                            <h2> {post.id} {post.title}</h2>
                        </Link>
                        <hr />
                    </div>
                );
            })
        }
    </>
    )
}

export default ListPost

export async function getStaticProps() {
    
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    const data = await response.json();

    return (
        {
            props: {
                posts: data.slice(0, 3)
            }
        }
    );
}