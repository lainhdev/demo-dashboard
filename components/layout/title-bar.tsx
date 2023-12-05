const TitleBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl mt-3 p-5">{children}</div>
  );
};

export default TitleBar;
