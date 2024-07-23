const MockLeftSidebarComponent = () => {
  return (
    <div className="lg:bg-pink-400 lg:z-19 lg:w-[316px] lg:h-[936px] lg:fixed lg:left-0 lg:top-0 lg:p-4">
      <h2 className="text-white text-xl mb-4">Sidebar</h2>
      <ul className="text-white">
        <li className="mb-2">
          <a href="#">Link 1</a>
        </li>
        <li className="mb-2">
          <a href="#">Link 2</a>
        </li>
        <li className="mb-2">
          <a href="#">Link 3</a>
        </li>
        <li className="mb-2">
          <a href="#">Link 4</a>
        </li>
      </ul>
    </div>
  );
};

export default MockLeftSidebarComponent;
