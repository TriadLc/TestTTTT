import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import Select from "react-select";

import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDetailInforDoctorService } from "../../../services/userService";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
const mParser = new MarkdownIt();

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Save to Markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
      hasOldData: false,

      //Save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],

      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedClinic: "",
      selectedSpecialty: "",

      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId: "",
      specialtyId: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllRequiredDoctorInfor();
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;

    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi} VND`;
          let labelEn = `${item.valueEn} USD`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }

      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }

      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }

      if (type === "CLINIC") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
      return result;
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      let { resPrice, resPayment, resProvince, resSpecialty, resClinic } =
        this.props.allRequiredDoctorInfor;

      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      let dataSelectSpecialty = this.buildDataInputSelect(
        resSpecialty,
        "SPECIALTY"
      );
      let dataSelectClinic = this.buildDataInputSelect(resClinic, "CLINIC");

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      let { resPrice, resPayment, resProvince, resClinic } =
        this.props.allRequiredDoctorInfor;

      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      let dataSelectClinic = this.buildDataInputSelect(resClinic, "CLINIC");

      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listClinicP: dataSelectClinic,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      selectedSpecialty: this.state.selectedSpecialty.value,
      addressClinic: this.state.addressClinic,
      nameClinic: this.state.nameClinic,
      note: this.state.note,
      clinicId:
        this.state.selectedClinic && this.state.selectedClinic.value
          ? this.state.selectedClinic
          : "",
      specialtyId: this.state.selectedSpecialty.value,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listPrice, listPayment, listProvince, listSpecialty, listClinic } =
      this.state;

    let res = await getDetailInforDoctorService(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      let addressClinic = "",
        nameClinic = "",
        note = "",
        paymentId = "",
        priceId = "",
        provinceId = "",
        specialtyId = "",
        clinicId = "",
        selectedPayment = "",
        selectedPrice = "",
        selectedProvince = "",
        selectedSpecialty = "",
        selectedClinic = "";

      if (res.data.Doctor_Infor) {
        addressClinic = res.data.Doctor_Infor.addressClinic;
        nameClinic = res.data.Doctor_Infor.nameClinic;
        note = res.data.Doctor_Infor.note;
        paymentId = res.data.Doctor_Infor.paymentId;
        priceId = res.data.Doctor_Infor.priceId;
        provinceId = res.data.Doctor_Infor.provinceId;
        specialtyId = res.data.Doctor_Infor.specialtyId;
        clinicId = res.data.Doctor_Infor.clinicId;

        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectedSpecialty = listSpecialty.find((item) => {
          return item && item.value === specialtyId;
        });
        selectedClinic = listClinic.find((item) => {
          return item && item.value === clinicId;
        });
      }

      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPrice: selectedPrice,
        selectedPayment: selectedPayment,
        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",
        selectedPrice: "",
        selectedPayment: "",
        selectedProvince: "",
        selectedSpecialty: "",
        selectedClinic: "",
      });
    }
    //console.log("HoiDanIt check: ", res);
  };

  // optionChanged = (value) => {
  //   console.log(value);
  //   this.setState({ selectedValue: value });
  // };

  // handleOnChangeDesc = (event) => {
  //   this.setState({ description: event.target.value });
  // };

  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  render() {
    let { hasOldData } = this.state;
    console.log("Toi check state: ", this.state);
    return (
      <React.Fragment>
        <div className="manage-doctor-container">
          <div className="manage-doctor-title">
            <FormattedMessage id="admin.manage-doctor.title" />
          </div>

          <div className="more-infor">
            <div className="more-infor-content-left row">
              <div className="col-2 form-group">
                <label>
                  <FormattedMessage id="admin.manage-doctor.id" />
                </label>
                <input
                  className="form-control"
                  value={this.state.selectedOption.value}
                  disabled
                />
              </div>

              <div className="col-8 form-group">
                <label>
                  <FormattedMessage id="admin.manage-doctor.select-doctor" />
                </label>
                <Select
                  value={this.state.selectedOption}
                  onChange={this.handleChangeSelect}
                  options={this.state.listDoctors}
                  placeholder={
                    <FormattedMessage id="admin.manage-doctor.select-doctor" />
                  }
                />
              </div>

              {/* <div className="col-5 form-group">
                <label>Số diện thoại</label>
                <input
                  className="form-control"
                  value={this.state.selectedOption.value}
                  disabled
                />
              </div>
              <div className="col-6 form-group">
                <label>Điện chỉ</label>
                <input
                  className="form-control"
                  value={this.state.selectedOption.value}
                  disabled
                />
              </div> */}
            </div>
            <div className="more-infor-content-right row">
              <div className="col-12 form-group">
                <label>
                  <FormattedMessage id="admin.manage-doctor.intro" />
                </label>
                <textarea
                  className="col-12 form-group"
                  rows={5}
                  onChange={(event) =>
                    this.handleOnChangeText(event, "description")
                  }
                  value={this.state.description}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="more-infor-extra">
            <div className="floor-1 row">
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="admin.manage-doctor.price" />
                </label>
                <Select
                  value={this.state.selectedPrice}
                  onChange={this.handleChangeSelectDoctorInfor}
                  options={this.state.listPrice}
                  placeholder={
                    <FormattedMessage id="admin.manage-doctor.price" />
                  }
                  name="selectedPrice"
                />
              </div>

              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="admin.manage-doctor.province" />
                </label>
                <Select
                  value={this.state.selectedProvince}
                  onChange={this.handleChangeSelectDoctorInfor}
                  options={this.state.listProvince}
                  placeholder={
                    <FormattedMessage id="admin.manage-doctor.province" />
                  }
                  name="selectedProvince"
                />
              </div>
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="admin.manage-doctor.payment" />
                </label>
                <Select
                  value={this.state.selectedPayment}
                  onChange={this.handleChangeSelectDoctorInfor}
                  options={this.state.listPayment}
                  placeholder={
                    <FormattedMessage id="admin.manage-doctor.payment" />
                  }
                  name="selectedPayment"
                />
              </div>
            </div>

            <div className="floor-2 row">
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="admin.manage-doctor.nameClinic" />
                </label>
                <input
                  className="form-control"
                  onChange={(event) =>
                    this.handleOnChangeText(event, "nameClinic")
                  }
                  value={this.state.nameClinic}
                />
              </div>
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="admin.manage-doctor.addressClinic" />
                </label>
                <input
                  className="form-control"
                  onChange={(event) =>
                    this.handleOnChangeText(event, "addressClinic")
                  }
                  value={this.state.addressClinic}
                />
              </div>
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="admin.manage-doctor.note" />
                </label>
                <input
                  className="form-control"
                  onChange={(event) => this.handleOnChangeText(event, "note")}
                  value={this.state.note}
                />
              </div>
            </div>
            <div className="floor-3 row">
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="admin.manage-doctor.specialty" />
                </label>
                <Select
                  value={this.state.selectedSpecialty}
                  options={this.state.listSpecialty}
                  placeholder={
                    <FormattedMessage id="admin.manage-doctor.specialty" />
                  }
                  onChange={this.handleChangeSelectDoctorInfor}
                  name="selectedSpecialty"
                />
              </div>
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="admin.manage-doctor.select-clinic" />
                </label>
                <Select
                  value={this.state.selectedClinic}
                  options={this.state.listClinic}
                  placeholder={
                    <FormattedMessage id="admin.manage-doctor.select-clinic" />
                  }
                  onChange={this.handleChangeSelectDoctorInfor}
                  name="selectedClinic"
                />
              </div>
            </div>
          </div>

          <div className="col-12 my-4 manage-doctor-editor">
            <MdEditor
              style={{ height: "580px" }}
              renderHTML={(text) => mParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentMarkdown}
            />
          </div>
          <div className="col-12 text-center btn-control-doctor">
            <button
              onClick={() => this.handleSaveContentMarkdown()}
              className={
                hasOldData === true
                  ? "btn btn-primary save-content-doctor"
                  : "btn btn-primary create-content-doctor"
              }
            >
              {hasOldData === true ? (
                <span>
                  <FormattedMessage id="admin.manage-doctor.save" />
                </span>
              ) : (
                <span>
                  <FormattedMessage id="admin.manage-doctor.add" />
                </span>
              )}
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    getAllRequiredDoctorInfor: () =>
      dispatch(actions.getAllRequiredDoctorInfor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
