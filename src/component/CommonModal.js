import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import classNames from 'classnames';
import cross from "../assets/images/cross.png"


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
    palette: {
    background: {
      default: "#e4f0e2"
    }
  }
}

));




const sizes = {
  xl: 'w-75',
  lg:'w-50',
  md: 'w-40',
  cs: 'w-45',
  sm:'w-25'
}


const CommonModal = ({
  handleModalData,
  isModalOpen,
  modalData,
  modalSize,
  closeModal
}) => {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isModalOpen}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        
        <Fade in={isModalOpen}>
   
          <div
            id="custom-modal"
            className={classNames({
              [classes.paper]: true,
              [sizes[modalSize]]: true,
            })}
          >
            <span className="cross" onClick={closeModal}> <img src={cross} alt="" /></span>
            { modalData }
          </div>
 
        </Fade>
      
      </Modal>
    </div>
  );
}

export default CommonModal;