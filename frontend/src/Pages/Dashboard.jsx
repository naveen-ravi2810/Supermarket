import Navbar from './../Components/Navbar'

function Dashboard() {
  return (
    <div>
      <Navbar />
      <p>This is your user ID:{sessionStorage.getItem('_e_grocery_Username')}</p>
    </div>
  );
}

export default Dashboard;