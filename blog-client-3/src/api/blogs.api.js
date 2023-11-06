import axios from 'axios';


const pathLocal='http://localhost:4000/blog-api/entrada';

const blogApi = axios.create({
    baseURL: pathLocal,
})

export const getAllBlogs = () => {
    //return axios.get(pathLocal);
    return blogApi.get("/");
}

export const createBlog = (blog) => {
    return blogApi.post("/",blog);
}

export const deleteBlog = (id) => {
    return blogApi.delete("/" + id);
}


export const updateBlog = (id, blog) => {
    return blogApi.put("/"+ id ,blog);
}


export const getBlogById = (id) => {
    return blogApi.get("/" + id);
}
