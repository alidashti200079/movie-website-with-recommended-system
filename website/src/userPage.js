import React, { useEffect, useState } from 'react';
import './userPage.css';
import Navbar from './navbar';
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import api from './api/api';
import ProfilesTable from './contexts/profileTable';
import { ProfileProvider } from './contexts/profileContext';
import { UpdateProfileContextProvider } from './contexts/updateProfileContext';
import TransactionsTable from './contexts/transactionTable';
import { TransactionProvider } from './contexts/transactionContext';
import ReportsTable from './contexts/reportTable';
import { ReportProvider } from './contexts/reportContext';
import { UpdateReportContextProvider } from './contexts/updateReportContext';
import ConnecteddeviceTable from './contexts/connecteddeviceTable';
import { DeviceProvider } from './contexts/connectedDeviceContext';
import FavoriteTable from './contexts/favoriteTable';
import { FavoriteProvider } from './contexts/favoriteContext';
import VotedTable from './contexts/votedTable';
import { VoteProvider } from './contexts/votedContext';
import { UpdateVotedContextProvider } from './contexts/updateVotedContext';

const UserPage = () => {

  const [state, setState]=useState("Profile"); 
  const [selectedTab, setSelectedTab] = useState('UserProfile');
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({}); 
  const [formTransaction, setFormTransaction] = useState({
    user_id: '',
    payment_amount: '',
    payment_time: ''
  });
  const [formReport, setFormReport] = useState({
    user_id: '',
    comment: ''
  });
  const [formVote, setFormVote] = useState({
    user_id: '',
    movie_id: '',
    user_rating: ''
  });

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    if (selectedTab === 'Transactionhistory') {
      setFormTransaction({
        ...formTransaction,
        [event.target.name]: value,
      });
    } else if (selectedTab === 'Reports') {
      setFormReport({
        ...formReport,
        [event.target.name]: value,
      });
    } else if (selectedTab === 'Voted') {
      setFormVote({
        ...formVote,
        [event.target.name]: value,
      });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (selectedTab === 'Transactionhistory') {
      await api.post('/transactionhistory', formTransaction);
      setFormTransaction({
        user_id: '',
        payment_amount: '',
        payment_time: ''
      })
    } else if (selectedTab === 'Reports') {
      await api.post('/report', formReport);
      setFormReport({
        user_id: '',
        comment: ''
      })
    } else if (selectedTab === 'Voted') {
      await api.post('/voted', formVote);
      setFormVote({
        user_id: '',
        movie_id: '',
        user_rating: ''
      })
    }
    handleCloseDialog();
  } 

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({});
  };

  const renderDialog = () => (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Add New {typeof selectedTab === 'string' ? selectedTab.slice(0, -1) : ''}</DialogTitle>
      <DialogContent>
        {selectedTab === 'Transactionhistory' && (
          <>
            <TextField label="User_id" name="user_id" onChange={handleInputChange} fullWidth />
            <TextField label="Payment_amount" name="payment_amount" onChange={handleInputChange} fullWidth />
            <TextField label="Payment_time" name="payment_time" onChange={handleInputChange} fullWidth />
          </>
        )}
        {selectedTab === 'Reports' && (
          <>
            <TextField label="User_id" name="user_id" onChange={handleInputChange} fullWidth />
            <TextField label="Comment" name="comment" onChange={handleInputChange} fullWidth />
          </>
        )}
        {selectedTab === 'Voted' && (
          <>
            <TextField label="User_id" name="user_id" onChange={handleInputChange} fullWidth />
            <TextField label="Movie_id" name="movie_id" onChange={handleInputChange} fullWidth />
            <TextField label="User_rating" name="user_rating" onChange={handleInputChange} fullWidth />
          </>
        )}
      </DialogContent>
      <Button onClick={handleFormSubmit}>Add</Button>
    </Dialog>
  );

  const user_profile = () => {

    setState("Profile")
    handleTabChange('UserProfile')

  }

  const transactionhistory = () => {

    setState("Transaction history")
    handleTabChange('Transactionhistory')

  }

  const report = () => {

    setState("Reports")
    handleTabChange('Reports')

  }

  const connectedDevices = () => {

    setState("Connected devices")
    handleTabChange('ConnectedDevices')

  }

  const favorites = () => {

    setState("Favorites")
    handleTabChange('Favorites')

  }

  const voted = () => {

    setState("Voted")
    handleTabChange('Voted')

  }

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
      const navTabs = document.querySelectorAll("#nav-tabs > a");
      navTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          navTabs.forEach((tab) => {
            tab.classList.remove("active");
          });
          tab.classList.add("active");
        });
      });
    }, []);

  return (
    <>
    <Navbar/>
    {renderDialog()}
    <div className="div1">
        <div className="site-wrap">

        <nav className="site-nav">

        <div className="name">
        User Dashboard
        </div>

        <ul>
        <li><a onClick={user_profile}>Profile</a></li>
        <li><a onClick={connectedDevices}>Connected devices</a></li>
        <li><a onClick={transactionhistory}>Transaction history</a></li>
        <li><a onClick={favorites}>Favorites</a></li>   
        <li><a onClick={voted}>Voted</a></li>
        <li><a onClick={report}>Reports</a></li>
        </ul>

        <div className="note">
        <h3>Your Monthly Report</h3>
        <p>There are only 13 days left in your subscription.</p>
        </div>

        </nav>

        <main>

        <header>
        <h1 className="title">{state}</h1>

        </header>

        <div className='div2'>

        {selectedTab === 'UserProfile' && (
          <ProfileProvider>
            <UpdateProfileContextProvider>
              <ProfilesTable />
            </UpdateProfileContextProvider>
          </ProfileProvider>
        )}

        {selectedTab === 'Transactionhistory' && (
          <>
          <TransactionProvider>
              <TransactionsTable />
          </TransactionProvider>
          <div style={{ margin:'-32px 0 0 5px'}}>
            <Button variant="contained" onClick={handleOpenDialog}>Add</Button>
          </div>
         </>
        )}

        {selectedTab === 'Reports' && (
          <>
          <ReportProvider>
            <UpdateReportContextProvider>
              <ReportsTable />
            </UpdateReportContextProvider>
          </ReportProvider>
          <div style={{ margin:'-28px 0 0 5px'}}>
            <Button variant="contained" onClick={handleOpenDialog}>Add</Button>
          </div>
        </>
        )}

        {selectedTab === 'ConnectedDevices' && (
          <DeviceProvider>
            <ConnecteddeviceTable />
          </DeviceProvider>
        )}

        {selectedTab === 'Favorites' && (
          <FavoriteProvider>
            <FavoriteTable />
          </FavoriteProvider>
        )}

        {selectedTab === 'Voted' && (
          <>
          <VoteProvider>
            <UpdateVotedContextProvider>
              <VotedTable />
            </UpdateVotedContextProvider>
          </VoteProvider>
          <div style={{ margin:'-28px 0 10px 5px'}}>
            <Button variant="contained" onClick={handleOpenDialog}>Add</Button>
          </div>
        </>
        )}

        </div>

        </main>

        </div>
        
    </div>
    </>
  );
};

export default UserPage;
