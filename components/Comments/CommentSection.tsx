import CommentList from "./CommentList";

const CommentSection = ({ id }: { id: string }) => {
  return (
    <section>
      <CommentList id={id} />
    </section>
  );
};

export default CommentSection;
