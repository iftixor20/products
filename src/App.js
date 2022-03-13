import { BrowserRouter, Switch, Route } from "react-router-dom";
import Suggestions from "./screens/Suggestions/Suggestions";
import EditFeedback from "./screens/EditFeedback/EditFeedback";
import NewFeedback from './screens/NewFeedback/NewFeedback';
import FeedbackDetails from './screens/FeedbackDetails/FeedbackDetails';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Suggestions />
        </Route>
        
        <Route exact path="/feedback/new">
          <NewFeedback />
        </Route>

        <Route path="/feedback/edit/:id">
          <EditFeedback />
        </Route>

        <Route path="/feedback/details/:id">
          <FeedbackDetails />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;