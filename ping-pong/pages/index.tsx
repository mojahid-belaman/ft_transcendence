import Link from 'next/link'
import React from 'react'

function Home() {
  return (
    <div>
      Home
      <Link href="/users">
          <a>Users</a>
      </Link>
      <Link href="/blog">
          <a>Posts</a>
      </Link>
    </div>
  )
}

export default Home