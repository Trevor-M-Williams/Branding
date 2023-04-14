import { useEffect, useRef } from "react";

function StyleGuide({ data }) {
  const taglineRef = useRef(null);
  const summaryRef = useRef(null);
  const typographyRef = useRef(null);
  const colorsRef = useRef(null);
  const hexRef1 = useRef(null);
  const hexRef2 = useRef(null);
  const hexRef3 = useRef(null);
  const colorName1 = useRef(null);
  const colorName2 = useRef(null);
  const colorName3 = useRef(null);
  const colorHex1 = useRef(null);
  const colorHex2 = useRef(null);
  const colorHex3 = useRef(null);

  const {
    tagline,
    typography,
    primaryColor,
    accentColor,
    neutralColor,
    summary,
    hex1,
    hex2,
    hex3,
  } = data;

  useEffect(() => {
    taglineRef.current.innerHTML = tagline;
    summaryRef.current.innerHTML = summary;
    typographyRef.current.innerHTML = typography;
    colorsRef.current.innerHTML =
      primaryColor + "\n" + accentColor + "\n" + neutralColor;
    hexRef1.current.style.backgroundColor = hex1;
    hexRef2.current.style.backgroundColor = hex2;
    hexRef3.current.style.backgroundColor = hex3;
    colorHex1.current.innerHTML = `Hex: ${hex1}`;
    colorHex2.current.innerHTML = `Hex: ${hex2}`;
    colorHex3.current.innerHTML = `Hex: ${hex3}`;
  }, data);

  return (
    <div className="py-6 mx-auto w-full max-w-4xl px-4">
      <h1 className="text-3xl font-semibold mb-2">CyberTekIQ</h1>
      <h2 ref={taglineRef} className="text-xl font-medium mb-2">
        Tagline
      </h2>
      <p ref={summaryRef} className="">
        Lorem ipsum
      </p>
      <h1 className="text-2xl font-semibold mb-2 mt-4">Typography</h1>
      <p ref={typographyRef} className="">
        Lorem ipsum
      </p>
      <h1 className="text-2xl font-semibold mb-2 mt-4">Colors</h1>
      <p ref={colorsRef} className="">
        Lorem ipsum
      </p>
      <div className="flex h-80 mt-4">
        <div className="w-1/3 h-full border shadow-xl rounded-t-lg overflow-hidden">
          <div ref={hexRef1} className="bg-blue-300 h-2/3"></div>
          <div className="bg-white h-1/3 p-2">
            <div ref={colorHex1} className="flex items-center justify-between">
              Hex: #000000
            </div>
          </div>
        </div>
        <div className="w-1/3 mx-4 h-full border shadow-xl rounded-t-lg overflow-hidden">
          <div ref={hexRef2} className="bg-blue-300 h-2/3"></div>
          <div className="bg-white h-1/3 p-2">
            <div ref={colorHex2}>Hex: #000000</div>
          </div>
        </div>
        <div className="w-1/3 h-full border shadow-xl rounded-t-lg overflow-hidden">
          <div ref={hexRef3} className="bg-blue-300 h-2/3"></div>
          <div className="bg-white h-1/3 p-2">
            <div ref={colorHex3}>Hex: #000000</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StyleGuide;
