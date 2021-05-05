import TestExample from '../posts/test-example'
import TestExample2 from '../posts/test-example2'
import { RiComputerLine } from "react-icons/ri";
const PostsData = [
    {
        id:"test-example",
        icon: RiComputerLine,
        title: "This is a title",
        date: "02-12-2020",
        summary: "this is a summary of the post",
        content: <TestExample />
    },
    {
        id:"test-example2",
        icon: RiComputerLine,
        title: "This is a title2",
        date: "02-12-2020",
        summary: "this is a summary of the post2",
        content: <TestExample2 />
    }
]

export default PostsData;