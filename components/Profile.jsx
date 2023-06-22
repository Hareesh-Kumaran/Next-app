import "@/styles/Profile.scss";
import Card from "./PromptCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
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

      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry columnsCount={3} className="promptCard-wrapper">
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
        </Masonry>
      </ResponsiveMasonry>
    </section>
  );
}
