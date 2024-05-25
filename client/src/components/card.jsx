export default function Card({ title, tag, comment, url, id }) {
  return (
    <>
      <a className="card w-96 bg-base-200 shadow-xl" href={id ? `/${id}` : ""}>
        <figure className="h-64">
          <img
            src={`${url}`}
            alt="Post Image"
            className="rounded-xl object-contain "
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">
            {title}
            <div className="badge badge-secondary">{tag}</div>
          </h2>
          <p>{comment}</p>
          <div className="card-actions"></div>
        </div>
      </a>
    </>
  );
}
