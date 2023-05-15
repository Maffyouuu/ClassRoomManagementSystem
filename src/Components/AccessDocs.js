import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { db } from './firebase'
import {
    collection,
    getDocs,
    addDoc,
    doc,
    deleteDoc } from '@firebase/firestore';
import "./App";

export default function AccessDocs() {

    //variables for CRUD
    //get list of documents
    const [documents, setDocuments] = useState([]);
    const documentsCollectionRef = collection(db, "Documents");

    //variable for adding documents
    const [newDoc, setNewDoc] = useEffect("");
    const [newDocType, setNewDocType] = useEffect("");

    //AddDocument
    const addDocument = async () =>{
        await addDoc(documentsCollectionRef, {Name: newDoc, Type: newDocType});
    }

    //deleteDocument
    const deleteDocument = async (id) =>{
        const currentDocument = doc(db, "Documents", id);
        await deleteDoc(currentDocument);
    }
    
    //calls data so it displays immediately when page is loaded
    useEffect(() => {

        const getDocuments = async () => {
            //create ref to col on firebase
            const dbData = await getDocs(documentsCollectionRef);
            setDocuments(dbData.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        };

        getDocuments()
    }, []
    )


  return (
    <div>
        <h3 className='text-align: left'>Please select what document you wish to use</h3>
        <br/>
        <br/>
        <Table>
            <tr>
                <th>Documents</th>
                <th>Select type</th>
            </tr>
            {documents.map((documents) => {return (<div>
                {" "}
                <td>{documents.Name}</td>
                <td>{documents.Type}</td>
                </div>
            );
        })}
        </Table>
        <br/>
        <br/>
        <div>
            <input placeholder="Document name..." onChange={(event) => {setNewDoc(event.target.value)}}></input>
            <input placeholder="Document type..." onChange={(event) => {setNewDocType(event.target.value)}}></input>
            <Button onClick={addDocument} className="btn btn-primary w-100 mt-3">Add Document</Button>
        </div>
        <br/>
        <br/>
        <div>
            <Button onClick={() => {deleteDocument(doc.id)}} className="btn btn-primary w-100 mt-3">Delete Document</Button>
        </div>
    </div>
  )
}