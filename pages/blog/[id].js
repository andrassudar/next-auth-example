import { useRouter } from 'next/router'
import posts from '../../posts.json'

const BlogPosts = () => {
    const router = useRouter()
    const post = posts[router.query.id]
    if (!post) return <p></p>
    return (
        <>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </>
    )
}

export default BlogPosts
