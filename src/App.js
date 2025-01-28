import './App.css';
import { useEffect, useState, useRef } from 'react'
function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalRows = 100;
  let users;
  const numberOfRowsPerPage = 7;
  const totalPages = Math.ceil(totalRows / numberOfRowsPerPage);
  console.log(totalPages);

  useEffect(() => {
    async function fetchingData() {
      const firstRow = 7 * currentPage - 6;
      const lastRow = Math.min(totalRows, firstRow + 6);
      const err = "something went wrong";
      try {
        const response = await fetch(`https://dummyjson.com/users?limit=7&skip=${lastRow - 7}`);
        const data = await response.json();
        users = data.users;
        console.log(users);
      }
      catch {
        console.log("Error fetching data:", err);
      }


      // let's display the rows
      const tbody = document.getElementById('tableBody');
      tbody.innerHTML = '';
      for (let i = 0; i < numberOfRowsPerPage; i++) {
        const tableRow = document.createElement('tr');

        const tableData1 = document.createElement('td');
        tableData1.textContent = users[i].firstName;
        const tableData2 = document.createElement('td');
        tableData2.textContent = users[i].lastName;
        const tableData3 = document.createElement('td');
        tableData3.textContent = users[i].age;

        tableRow.appendChild(tableData1);
        tableRow.appendChild(tableData2);
        tableRow.appendChild(tableData3);

        tbody.appendChild(tableRow);
      }
    }
    fetchingData();

  }, [currentPage]);

  // creating layouts

  const buttons = [];

  if (currentPage <= 4) {
    for (let i = 1; i <= 5; i++) {
      buttons.push(i);
    }
    buttons.push('...');
    buttons.push(totalPages);
  }
  else if (currentPage >= totalPages - 3) {
    buttons.push(1);
    buttons.push('...')
    for (let i = totalPages - 4; i <= totalPages; i++) {
      buttons.push(i);
    }
  }
  else {
    buttons.push(1);
    buttons.push('...');
    buttons.push(currentPage - 1);
    buttons.push(currentPage);
    buttons.push(currentPage + 1);
    buttons.push('...');
    buttons.push(totalPages);
  }

  console.log(buttons);

  const numericBtnsRef = useRef();

  useEffect(() => {

    numericBtnsRef.current.innerHTML = '';

    buttons.forEach(button => {
      const btn = document.createElement('button');
      btn.textContent = button;
      btn.className = 'btn';
      if (button === '...') {
        btn.disabled = true;
      }

      if(button === currentPage){
        btn.style.backgroundColor = '#d0e7ff';
      }

      btn.addEventListener('click', () => {
        setCurrentPage(button);
      });

      numericBtnsRef.current.appendChild(btn);
    });

  }, [currentPage]);




  useEffect(() => {

    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    const handlePrevClick = () => {
      setCurrentPage(currentPage - 1);
    };

    const handleNextClick = () => {
      setCurrentPage(currentPage + 1);
    };

    prevBtn.addEventListener('click', handlePrevClick);
    nextBtn.addEventListener('click', handleNextClick);

    return () => {
      prevBtn.removeEventListener('click', handlePrevClick);
      nextBtn.removeEventListener('click', handleNextClick);
    }

  }, [currentPage]);

  return (
    <>
      <div className="app">
        <h1>creating pagination</h1>
        {/* fetch data */}
        <table >
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody id='tableBody'>

          </tbody>
        </table>
        <div className="btns">

          <button id="prev" className='btn'>Prev</button>
          <div id="numericBtns" ref={numericBtnsRef} >

          </div>
          <button id="next" className='btn'>Next</button>
        </div>
      </div>
    </>
  );
}

export default App;
