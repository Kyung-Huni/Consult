export default function Practice() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow  mx-auto mt-10">
        <div className="flex justify-between">
          <h2>제목</h2>
          <button>버튼</button>
        </div>
        <p className="mt-4">여기에 본문이 들어감</p>
      </div>

      <div className="bg-white rounded-xl shadow-md w-[400px] mx-auto h-[200px] overflow-y-auto">
        <ul className="p-6 space-y-2">
          <li className="p-2 rounded hover:bg-gray-200 hover:text-blue-500 cursor-pointer">
            리스트 1
          </li>
          <li className="p-2 rounded shadow-md hover:bg-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer">
            리스트 2
          </li>
          <li className="p-2 rounded hover:bg-gray-100 cursor-pointer transition-all">리스트 3</li>
          <li className="p-2 rounded hover:bg-gray-100 cursor-pointer transition-all">리스트 4</li>
          <li className="p-2 rounded hover:bg-gray-100 cursor-pointer transition-all">리스트 5</li>
          <li className="p-2 rounded hover:bg-gray-100 cursor-pointer transition-all">리스트 6</li>
          <li className="p-2 rounded hover:bg-gray-100 cursor-pointer transition-all">리스트 7</li>
          <li className="p-2 rounded hover:bg-gray-100 cursor-pointer transition-all">리스트 8</li>
        </ul>
      </div>

      <button className="bg-blue-500 rounded-xl p-2 block mx-auto hover:bg-blue-600 text-white">
        Hover Me
      </button>

      <div className="bg-white rounded-xl shadow-sm w-[400px] h-[200px] p-6 mx-auto hover:scale-105 hover:shadow-lg hover:bg-blue-400 hover:text-white hover:rotate-1 transition-all duration-300 ease-in-out">
        This Is Card
      </div>

      <div className="relative rounded-xl shadow-sm p-4 bg-white w-[300px] h-[200px]">
        <h3>제목</h3>
        <p>내용</p>
        <button className="bg-blue-500 text-white p-2 rounded-md absolute bottom-4 right-4 hover:bg-blue-600">
          우측하단 버튼
        </button>
      </div>
    </div>
  );
}
