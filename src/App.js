import './App.css';
import DashboardContent from './components/page/Dashboard'
import StaffsContext from './components/page/StaffsContext'
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div className="App">
      <StaffsContext.Provider>
        <SnackbarProvider>
          <DashboardContent />
        </SnackbarProvider>
      </StaffsContext.Provider>
    </div>
  );
}

export default App;
