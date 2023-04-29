import Navbar from './../Components/Navbar'

function Dashboard() {
  return (
    <div>
      <Navbar />
      <p>This is your user ID:{localStorage.getItem('Name')}</p>
    </div>
  );
}

export default Dashboard;