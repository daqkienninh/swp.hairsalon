import React, { useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileTemplate() {

  return (
    <section style={{ backgroundColor: "#f4f5f7", minHeight: "100vh" }}>
      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center">
          <MDBCol lg="8">
            <MDBCard className="mb-4 shadow-sm">
              <MDBCardBody>
                <div className="text-center mb-4">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "150px", margin: "0 auto" }}
                    fluid
                  />
                </div>
                <div className="text-center mb-4">
                  <h4 className="mb-1">Johnatan Smith</h4>
                  <p className="text-muted mb-3">Full Stack Developer</p>
                  <div className="d-flex justify-content-center">
                    <MDBBtn
                      rounded
                      className="me-2"
                      style={{
                        backgroundColor: "#94B49F",
                        color: "white", // Màu chữ
                        borderColor: "#94B49F", // Màu viền nếu cần
                      }}
                    >
                      Update
                    </MDBBtn>
                    {/* <MDBBtn outline rounded>
                      Message
                    </MDBBtn> */}
                  </div>
                </div>
                <hr className="my-4" />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      Johnatan Smith
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr className="my-4" />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      example@example.com
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr className="my-4" />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      (097) 234-5678
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr className="my-4" />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      Bay Area, San Francisco, CA
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
