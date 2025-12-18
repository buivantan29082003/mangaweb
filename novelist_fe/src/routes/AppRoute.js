import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import UserBaseLayout from '../pages/user/BaseLayout';
import Discovery from '../pages/user/Discover';
import HomePage from '../pages/user/Home';
import Seacrhing from '../pages/user/Search'; 
import StoryDetail from '../pages/user/StoryDetail';
import Chapter from '../pages/user/Chapter';
import Plan from '../pages/user/Plan';
import BookMark from '../pages/user/BookMark';
import AdminBaseLayout from '../pages/admin/BaseLayout';
import ManageWorks from '../pages/admin/ManageWork';
import AddChapter from '../components/admin/AddChapterForm';
import StoryDetailAdmin from '../pages/admin/DetailWork';
import UpdateChapter from '../pages/admin/UpdateChapter';
import Traffic from '../pages/admin/Traffic';
import Registration from '../pages/admin/Registration';
import ManageAccount from '../pages/admin/ManageAccount';
import TrafficOveral from '../pages/admin/TrafficOveral';
import Login from '../pages/Login';
import MyPackage from '../pages/user/YourPackage';
import ManageAccountUser from '../pages/user/ManageAccount';

const AppRoute=()=>{
    return <>
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRoute/>}>
                    <Route path='/user' element={<UserBaseLayout/>}>
                        <Route path='home' element={<HomePage/>}/>
                        <Route path='discovery' element={<Discovery/>}/>
                        <Route path='search' element={<Seacrhing/>}/>
                        <Route path='story/:id' element={<StoryDetail/>}/>
                        <Route path='chapter/:chapterId' element={<Chapter/>}/>
                        <Route path='plans' element={<Plan/>}/>
                        <Route path='bookmarks' element={<BookMark/>}/>
                        <Route path='mypackage' element={<MyPackage/>}/>
                        <Route  path='account' element={<ManageAccountUser/>}/>
                    </Route> 
                </Route>
                <Route path='/login' element={<Login/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route path='/admin' element={<AdminBaseLayout/>}> 
                        <Route  path='works'element={<ManageWorks/>}/>
                        <Route  path='work/:workId'element={<StoryDetailAdmin/>}/>
                        <Route  path='work/chapter/add/:workId'element={<AddChapter/>}/>
                        <Route  path='chapter/update/:chapterId'element={<UpdateChapter/>}/>
                        <Route  path='work/traffic/:workId' element={<Traffic/>}/>
                        <Route  path='registration' element={<Registration/>}/>
                        <Route  path='account' element={<ManageAccount/>}/>
                        <Route  path='traffic' element={<TrafficOveral/>}/>
                        
                    </Route > 
                </Route> 
            </Routes>
        </BrowserRouter>
    </>
}

export default AppRoute