import { DummyPost } from "~/app/_components/dummyPost";


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <div>
            <div>Page - {id}</div>
            <DummyPost id={id} />
        </div>
    );
}

// no longer is params directly accessed from url by ssr page, rather its now a promise, and for client pages tehy needs to be drilled to them
// const DynamicDummyPost = ({params}: {params: {id: string}}) => {
//     const {id} = params;
//     // if (!id) return null;

//     const {data, error, isLoading} = api.dummyPosts.cachedPost.useQuery({id: id});

//     if (isLoading) return <div>Loading...</div>;

//     if (error) return <div>{error.message}</div>;

//     console.log(data);

//     return (
//         <div>
//             {/* <div>DynamicDummyPost - {params.id}</div> */}
//             <div>DynamicDummyPost - {id}</div>
//             <div>{data?.id}</div>
//             <div>{data?.title}</div>
//             <div>{data?.body}</div>
//         </div>
//     );
// };

// export default DynamicDummyPost;