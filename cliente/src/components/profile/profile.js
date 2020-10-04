/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from "react";
import { Button, Tabs, Avatar, notification, Tooltip } from "antd";
import { useDropzone } from "react-dropzone";
import NoAvatar from "../../assets/img/png/no-avatar.png";
import Modal from "../modal";
import EditProfileForm from "./editProfileForm";
import { getAccessTokenApi } from "../../api/auth";
import {
  getUserApi,
  getAvatarApi,
  updateUserApi,
  uploadAvatarApi,
} from "../../api/user";
import jwt_decode from "jwt-decode";
import {
  getLoanResourceApi,
  getLoanSpaceApi,
  getLoanSpaceProfileApi,
  getLoanResourceProfileApi,
} from "../../api/loan";
import ListLoansProfile from "./ListLoansProfile";
import "./profile.scss";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

export default function Profile(props) {
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [userData, setUserData] = useState({});
  const [listLoan, setListLoan] = useState([]);
  const [reloadLoans, setReloadLoans] = useState(false);

  const accessToken = getAccessTokenApi();
  useEffect(() => {
    var token_decoded = jwt_decode(accessToken);
    getUserApi(accessToken, token_decoded["id"]).then((response) => {
      if (response) {
        setUser(response["user"]);
      }
    });
  }, [accessToken]);

  useEffect(() => {
    setUserData(user);
    cargarPrestamos();
  }, [user]);

  const editProfile = () => {
    setIsVisibleModal(true);
    setModalTitle("Editando perfil");
    setModalContent(
      <EditProfileForm
        setIsVisibleModal={setIsVisibleModal}
        user={user}
        avatar={avatar}
      />
    );
  };

  //obtener avatar
  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  //actualizar avatar
  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  //obtener prestamo de recursos
  const cargarPrestamos = async () => {
    await getLoanResourceApi(user.email).then((response) => {
      if (response.listado.length > 0) {
        response.listado.forEach((item) => {
          getLoanResourceProfileApi(item.idRecurso).then((infoResource) => {
            const data = {
              idLoan: item._id,
              id: infoResource.listado[0]._id,
              usuario: item.usuario,
              fechaInicio: item.fechaInicio,
              fechaFin: item.fechaEntrega,
              nombre: infoResource.listado[0].name,
              descripcion: infoResource.listado[0].description,
              code: infoResource.listado[0].code,
            };
            setListLoan((listLoan) => [...listLoan, data]);
          });
        });
      }
    });

    await getLoanSpaceApi(user.email).then((response) => {
      if (response.listado.length > 0) {
        response.listado.forEach((item) => {
          getLoanSpaceProfileApi(item.idSpace).then((infoSpace) => {
            const data = {
              idLoan: item._id,
              id: infoSpace.listado[0]._id,
              usuario: item.usuario,
              fechaInicio: item.fechaInicio,
              fechaFin: item.fechaEntrega,
              nombre: infoSpace.listado[0].name,
              descripcion: infoSpace.listado[0].description,
            };
            setListLoan((listLoan) => [...listLoan, data]);
          });
        });
      }
    });
  };

  useEffect(() => {
    setListLoan([]);
    cargarPrestamos();
    setReloadLoans(false);
  }, [reloadLoans]);

  return (
    <div className="edit-profile">
      <div className="edit-profile__header">
        {/* componente Dropzone */}
        <div className="profile-element">
          <Tooltip title="Editar foto">
            <div className="profile-element-avatar">
              <UploadAvatarProfile
                avatar={avatar}
                setAvatar={setAvatar}
                userData={userData}
                setUserData={setUserData}
                user={user}
              />
            </div>
          </Tooltip>
          <h2 className="titulo">{user["name"] ? user["name"] : "..."}</h2>
        </div>
        {/* <Button>avatar</Button> */}
        <Button type="primary" onClick={editProfile}>
          Editar perfil
        </Button>
      </div>
      <div className="edit-profile__tabs">
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane className="loans-render" tab="Prestamos" key="1">
            <ListLoansProfile
              loans={listLoan}
              setReloadLoans={setReloadLoans}
              email={user.email}
            ></ListLoansProfile>
          </TabPane>
        </Tabs>
      </div>
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function UploadAvatarProfile(props) {
  const { avatar, setAvatar, userData, setUserData, user } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  const updateAvatar = () => {
    //e.preventDefault();

    let userUpdate = userData;
    const token = getAccessTokenApi();

    if (typeof userUpdate.avatar === "object") {
      uploadAvatarApi(token, userUpdate.avatar, user._id).then((response) => {
        userUpdate.avatar = response.avatarName;
        updateUserApi(token, userUpdate, user._id).then((result) => {
          setUserData({ ...userData, password: "", repeatPassword: "" });
          notification["success"]({ message: result.message });
        });
      });
    }
  };

  useEffect(() => {
    let userUpdate = userData;
    const token = getAccessTokenApi();

    if (typeof userUpdate.avatar === "object") {
      uploadAvatarApi(token, userUpdate.avatar, user._id).then((response) => {
        userUpdate.avatar = response.avatarName;
        updateUserApi(token, userUpdate, user._id).then((result) => {
          notification["success"]({ message: result.message });
        });
      });
    }
  }, [setAvatar, user, userData]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
      updateAvatar();
    },
    [setAvatar, updateAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    keyboard: true,
    onDrop,
  });

  return (
    <div className="upload-avatar-profile" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={90} src={NoAvatar} />
      ) : (
        <Avatar size={90} src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}
