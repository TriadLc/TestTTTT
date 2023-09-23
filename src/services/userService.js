import axios from "../axios";

const handleLoginApiService = (userEmail, userPassword) => {
  return axios.post("api/login", { email: userEmail, password: userPassword });
};

const getAllUsersService = (inputId) => {
  //temple string
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  console.log("Check data from service: ", data);
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctorsService = () => {
  return axios.get(`/api/get-all-doctors`);
};

const saveDetailDoctorService = (data) => {
  return axios.post(`/api/save-infor-doctor`, data);
};

const getDetailInforDoctorService = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

const saveBulkScheduleDoctorService = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};

const getScheduleDoctorByDateService = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};

const getExtraInforDoctorByIdService = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorByIdService = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postPatientBookingAppointmentService = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
};

const postVerifyBookAppointmentService = (data) => {
  return axios.post(`/api/verify-book-appointment`, data);
};

const createNewSpecialtyService = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};

const getAllSpecialtyService = () => {
  return axios.get(`/api/get-all-specialty`);
};

const getAllDetailSpecialtyByIdService = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};

const getAllClinicService = () => {
  return axios.get(`/api/get-all-clinic`);
};
const getDetailClinicByIdService = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`, data);
};

const createNewClinicService = (data) => {
  return axios.post(`/api/create-new-clinic`, data);
};

export {
  handleLoginApiService,
  getAllUsersService,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveDetailDoctorService,
  getDetailInforDoctorService,
  saveBulkScheduleDoctorService,
  getScheduleDoctorByDateService,
  getExtraInforDoctorByIdService,
  getProfileDoctorByIdService,
  postPatientBookingAppointmentService,
  postVerifyBookAppointmentService,
  createNewSpecialtyService,
  getAllSpecialtyService,
  getAllDetailSpecialtyByIdService,
  createNewClinicService,
  getAllClinicService,
  getDetailClinicByIdService,
};
