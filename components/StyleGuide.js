function StyleGuide({ data }) {
  let colors = [
    { name: "Primary", hex: data.primaryColor.hex },
    { name: "Accent", hex: data.accentColor.hex },
    { name: "Neutral", hex: data.neutralColor.hex },
  ];

  return (
    <div className="py-6 mx-auto w-full max-w-4xl px-4">
      <h1 className="text-3xl font-semibold mb-2">{data.companyName}</h1>
      <h2 className="text-xl font-medium mb-2">{data.tagline}</h2>
      <p>{data.summary}</p>
      <h1 className="text-2xl font-semibold mb-2 mt-4">Typography</h1>
      <p>{data.typography}</p>
      <h1 className="text-2xl font-semibold mb-2 mt-4">Colors</h1>
      <p className="mb-2">{data.primaryColor.description}</p>
      <p className="mb-2">{data.accentColor.description}</p>
      <p className="mb-2">{data.neutralColor.description}</p>
      <div className="flex h-80 mt-4 justify-between">
        {colors.map((color, i) => (
          <div
            key={i}
            className="w-[32%] h-full border shadow-xl rounded-lg overflow-hidden"
          >
            <div className="h-2/3" style={{ background: `${color.hex}` }}></div>
            <div className="bg-white h-1/3 p-3 border-t-2">
              <div>{color.name}</div>
              <div>{color.hex}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StyleGuide;
