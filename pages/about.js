import App from "../hoc/App";
import PostList from "../components/PostList";
import { ALL_POSTS_QUERY, allPostsQueryVars } from "../queries/postlist";
import { initializeApollo } from "../lib/apolloClient";

const AboutPage = () => {
  return (
    <App>
      <h1>NextJs About Page</h1>
      <PostList />
    </App>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_POSTS_QUERY,
    variables: allPostsQueryVars
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  };
}

export default AboutPage;
