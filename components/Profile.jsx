import "@/styles/Profile.scss";
import Card from "./PromptCard";

export default function Profile({
  data,
  handleEdit,
  handleDelete,
  name,
  desc,
}) {
  console.log("Profile", data);
  return (
    <section>
      <div className="description-wrapper">
        <h1>{name} Profile</h1>
        <p>{desc}</p>
      </div>

      <div className="promptCard-wrapper">
        {data.length !== 0 ? (
          data.map((item) => (
            <Card
              post={item}
              profileSection={true}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))
        ) : (
          <p className="profile-noPosts">No Posts Found</p>
        )}
      </div>
    </section>
  );
}
