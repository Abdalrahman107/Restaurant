const SectionHeader = ({ header }) => {
  return (
    <div className="header flex items-center justify-center relative after:absolute after:w-20 after:h-1 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-[#e52b34] mb-7">
      <h2 className="f-danc text-6xl font-extrabold text-center p-4">{header}</h2>
    </div>
  );
};

export default SectionHeader;
