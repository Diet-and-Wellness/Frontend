import DashBlog from "../../components/Dashboard/DashBlog";
import PlusIcon from "../../components/icons/PlusIcon";

const BlogsPage = () => {
  return (
    <section className="flex w-full flex-col gap-10">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="mb-2 text-3xl font-bold">Content & Blogs</h2>
          <p className="text-xl font-light text-[#4F4F4F]">
            Manage wellness articles and content.
          </p>
        </div>
        <button className="px-7.5 py-3 rounded-full bg-[#E99532] cursor-pointer hover:bg-[#e28010] transition duration-150 flex gap-2">
          <PlusIcon className="text-white" />
          <p className="text-[#FFFEFD] text-[18px] font-medium">Add Blog</p>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <DashBlog />
        <DashBlog />
        <DashBlog />
      </div>
    </section>
  );
};

export default BlogsPage;
