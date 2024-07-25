const MockLeftSidebarComponent = () => {
  return (
    <div className="bg-pink-400 z-50 w-[316px] h-[936px] fixed left-0 top-0 p-4">
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
