// import React, { useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom';
// import { getUsers } from '../services/Api.service';
// import { Accordion, Card, useAccordionButton, Button} from 'react-bootstrap'
// import Title from '../components/Title'
// import '../styles/users.css'
// import UserMenu from '../components/UserMenu';
// import DeleteUserModal from '../components/DeleteUserModal';
// import PersonalInfoModal from '../components/PersonalInfoModal';
// import AccessGarantiedModal from '../components/AccessGarantiedModal';

// function CustomToggle({ children, eventKey }) {
//   const decoratedOnClick = useAccordionButton(eventKey);

//   return (
//     <div onClick={decoratedOnClick} className="cardHeader">
//       {children}
//     </div>
//   );
// }

// export default function UsersPage() {
//   const history = useHistory()
//   const [allUsers, setAllUsers] = useState([])
//   const [usersViewed, setUsersViewed] = useState([])
//   const [page, setPage] = useState(0)
//   const [usersPerPage, setUsersPerPage] = useState(8)
//   const [showInfoModal, setShowInfoModal] = useState(false)
//   const [showDeleteUserModal, setShowDeleteUserModal] = useState(false)
//   const [showTitheModal, setShowTitheModal] = useState(false)
//   const [showAccessGarantied, setShowAccessGarantied] = useState(false)

//   const handleDelete = (user_id) => {

//   }

//   useEffect(() => {
//     getUsers()
//     .then(({data}) => {
//       setAllUsers(data)
//       setUsersViewed(data.slice(page * usersPerPage, (page + 1) * usersPerPage))
//     })
//   }, [])

//   useEffect(() => {
//     setUsersViewed(allUsers.slice(page * usersPerPage, (page + 1) * usersPerPage))
//   }, [allUsers, page, usersPerPage])

//   return (
//     <main>
//       <Title text="Membros" />
//       <AccessGarantiedModal show={showAccessGarantied} onHide={() => setShowAccessGarantied(false)}/>
//       <DeleteUserModal show={showDeleteUserModal} onHide={() => setShowDeleteUserModal(false)}/>
//       <Button variant="primary" onClick={() => history.push("/create_users")}>Criar um usuário</Button>
//       {allUsers.length === 0 ?
//         <p> Carregando membros... </p>
//         :
//         <>
//         <Accordion defaultActiveKey="0">
//           {usersViewed.map(user => (
//             <Card>
//               <PersonalInfoModal user={user} show={showInfoModal} onHide={() => setShowInfoModal(false)}/>

//               <Card.Header>
//                 <CustomToggle eventKey={user.id}>
//                     <p>{user.name}</p>
//                     <p className="memberSince">Membro desde: {user.member_since.split("-").reverse().join("/")}</p>
//                 </CustomToggle>
//                 <UserMenu showAccessModal={() => setShowAccessGarantied(true)} showDeleteModal={() => setShowDeleteUserModal(true)} deleteUser={() => handleDelete(user.id)}/>
//               </Card.Header>
//               <Accordion.Collapse eventKey={user.id}>
//                 <Card.Body>
//                   <div className="accordionRow">
//                     <div>
//                       <p>Sede:</p>
//                       <p>{user.branch}</p>
//                     </div>
//                     <div>
//                       <p>Estado civil:</p>
//                       <p>{user.marital_status}</p>
//                     </div>
//                     <p>{user.is_baptized ? "Batizado(a)" : "Não batizado(a)"}</p>
//                     <p>{user.age} anos</p>
//                   </div>

//                   <div className="accordionRow">
//                     <div>
//                       <p>Endereço:</p>
//                       <p>{user.location}</p>
//                     </div>
//                   </div>

//                   <div className="accordionRow">
//                     <p className="linkOpenModal" onClick={() => setShowInfoModal(true)}>Ver informações pessoais</p>
//                   </div>
//                 </Card.Body>
//               </Accordion.Collapse>
//             </Card>
//           ))}
//         </Accordion>
//         <div className="pagination">
//           <div className="configUsersPerPage">
//             <p>Exibir membros:</p>
//             <select onChange={e => setUsersPerPage(e.target.value)}>
//               <option value={8}>8</option>
//               <option value={10}>10</option>
//               <option value={13}>13</option>
//             </select>
//           </div>
//           <div className="configPage">
//             <button onClick={() => setPage( page - 1 )} disabled={ page <= 0}>{"<"}</button>
//             <button onClick={() => setPage( page + 1 )} disabled={ page >= (allUsers.length / usersPerPage)-1 }>{">"}</button>
//           </div>
//         </div>
//       </>
//     }
//     </main>
//   )
// }
