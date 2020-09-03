import Query from "../hoc/Query";
import { ALL_POSTS_QUERY, allPostsQueryVars } from "../queries/postlist";

export default function PostList() {
  return (
    <>
      <Query query={ALL_POSTS_QUERY} queryvariables={allPostsQueryVars}>
        {({ data: { allPosts } }) => {
          // allPosts matches GraphQL Query Method usable in a graphiql editor
          return (
            <ul>
              {allPosts.map((post, index) => (
                <li key={post.id}>
                  <p>
                    <span>{index + 1}. </span>
                    <a href={post.url}>{post.title}</a>
                  </p>
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    </>
  );
}
