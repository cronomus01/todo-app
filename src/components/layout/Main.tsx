import DraggableTasks from '../tasks/DraggableTasks';
import Header from './Header';

const Main = () => {
    return (
        <>
            <main className="grid grid-rows-content">
                <Header />
                <DraggableTasks />
            </main>
        </>
    );
};

export default Main;
