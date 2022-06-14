import './App.css';
import DashboardContent from './components/page/Dashboard'
import StaffsContext from './components/page/StaffsContext'

function App() {
  
  return (
    <div className="App">
      <StaffsContext.Provider>
        <DashboardContent />
      </StaffsContext.Provider>
    </div>
  );
}

export default App;
