import { Row, Col } from "react-bootstrap";
import Layout from "components/layout";
import { getPostBySlug, getAllPosts } from "lib/api";
import BlockContent from "@sanity/block-content-to-react";
import HightlightCode from "components/highlight-code";
import { urlFor } from "lib/api";
import PostHeader from "components/post-header";

const serializers = {
  types: {
    code: (props) => (
      <HightlightCode language={props.node.language}>
        {props.node.code}
        <div className="code-filename">{props.node.filename}</div>
      </HightlightCode>
    ),
    image: (props) => (
      <div className={`blog-image blog-image-${props.node.position}`}>
        <img src={urlFor(props.node).height(400).url()} />
        <div className="code-filename" style={{ textAlign: "center" }}>
          {props.node.alt}
        </div>
      </div>
    ),
  },
};

export default ({ post }) => {
  return (
    <Layout>
      <Row>
        <Col md="12">
          {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
          <PostHeader post={post} />
          <br />
          <BlockContent
            blocks={post.content}
            imageOptions={{ w: 320, h: 240, fit: "max" }}
            serializers={serializers}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export const getStaticProps = async ({ params }) => {
  const post = await getPostBySlug(params.slug);
  return {
    props: {
      post: post[0],
    },
  };
};

export const getStaticPaths = async () => {
  const posts = await getAllPosts();

  const data = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
  return {
    paths: data,
    fallback: false,
  };
};
