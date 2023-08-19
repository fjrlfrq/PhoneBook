import React, { useCallback, useState } from "react"
import UserForm from "../containers/UserForm"
import UserList from "../containers/UserList"
import { useDispatch } from 'react-redux'

export default function User(props) {

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        isAdd: false,
    })

    const handleAdd = useCallback((event) => {
        event.preventDefault()
        setUser({
            isAdd: true
        });
    }, [dispatch])

    const handleCancel = useCallback((event) => {
        event.preventDefault()
        setUser({
            isAdd: false
        })
    }, [dispatch])

    return (
        <div className="container mt-5">
            <div className="card">
                <div className=" shadow mb-4">
                    <div className="card-header pt-4 pb-3">
                        <h2>PHONEBOOK</h2>
                    </div>
                </div>

                <div className="card-body">
                    {user.isAdd ?
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold">Adding Form</h6>
                            </div>

                            <div className="card-body">
                                <UserForm
                                    cancel={handleCancel}
                                />
                            </div>
                        </div>
                        :
                        <div className="mb-4">
                            <button type="submit"
                                className="btn btn-primary"
                                onClick={handleAdd}>
                                <i className="bi bi-plus-lg"></i>
                                &nbsp;
                                add
                            </button>
                        </div>
                    }

                    <div className="card shadow mb-5">
                        <div className="card-header py-3" style={{ backgroundColor: '#e9f3e0' }}>
                            <h6 className="m-0 font-weight-bold" style={{ color: '#2bb5ff' }}>Search Form</h6>
                        </div>
                        <div className="card-body">
                            <UserForm
                                submitLabel="search"
                            />
                        </div>
                    </div>

                    <UserList />
                </div>
            </div>
        </div>
    )
} 