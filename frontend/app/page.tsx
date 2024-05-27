import Header from '../components/Header';
import FormSection from '../components/FormSection';
import TeamsSection from '../components/TeamsSection';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <FormSection />
        <TeamsSection />
      </main>
    </div>
  );
}

export default App;
