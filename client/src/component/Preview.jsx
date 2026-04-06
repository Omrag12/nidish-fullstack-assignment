import DOMPurify from "dompurify";

export default function Preview({ data }) {
  const safeParagraph = data.paragraph?.trim()
    ? DOMPurify.sanitize(data.paragraph)
    : "<p>This is default content</p>";

  return (
    <div className="preview">
      <div
        className="text-block"
        style={{ color: data.textColor || "#111111" }}
      >
        <h1>{data.heading?.trim() || "Welcome"}</h1>

        <div
          className="paragraph"
          dangerouslySetInnerHTML={{ __html: safeParagraph }}
        />
      </div>

     
      {data.imageUrl && (
        <div className="image-block">
          <img
            src={data.imageUrl}
            alt="Preview"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400?text=Image+Not+Found";
            }}
          />
        </div>
      )}
    </div>
  );
}