import React, { Component } from "react";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";

import "./DoctorExtraInfor.scss";
import { LANGUAGES } from "../../../utils";
import { getExtraInforDoctorByIdService } from "../../../services/userService";
import { lang } from "moment";
import { concat } from "lodash";
class DoctorExtrainInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    };
  }

  async componentDidMount() {
    if (this.props.doctorIdFromParent) {
      let res = await getExtraInforDoctorByIdService(
        this.props.doctorIdFromParent
      );
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getExtraInforDoctorByIdService(
        this.props.doctorIdFromParent
      );
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };

  render() {
    let { isShowDetailInfor, extraInfor } = this.state;
    let { language } = this.props;

    //console.log("Check state: ", this.state);
    return (
      <React.Fragment>
        <div className="doctor-extra-infor-container">
          <div className="content-up">
            <div className="text-address">
              <FormattedMessage id="patient.extra-infor-doctor.text-address" />
            </div>
            <div className="name-clinic">
              {extraInfor && extraInfor.nameClinic
                ? concat(
                    <FormattedMessage id="patient.extra-infor-doctor.notification-nameClinic" />,
                    extraInfor.nameClinic
                  )
                : ""}
            </div>
            <div className="detail-address">
              {extraInfor && extraInfor.addressClinic
                ? concat(
                    <FormattedMessage id="patient.extra-infor-doctor.notification-addressClinic" />,
                    extraInfor.addressClinic
                  )
                : ""}
            </div>
          </div>
          <div className="content-down">
            {isShowDetailInfor === false && (
              <div className="short-infor">
                <FormattedMessage id="patient.extra-infor-doctor.price" />

                {extraInfor &&
                  extraInfor.priceTypeData &&
                  language === LANGUAGES.VI && (
                    <NumberFormat
                      className="currency"
                      value={extraInfor.priceTypeData.valueVi}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={" VND"}
                    />
                  )}
                {extraInfor &&
                  extraInfor.priceTypeData &&
                  language === LANGUAGES.EN && (
                    <NumberFormat
                      className="currency"
                      value={extraInfor.priceTypeData.valueVi}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"$"}
                    />
                  )}
                <hr />
                <span
                  className="detail"
                  onClick={() => this.showHideDetailInfor(true)}
                >
                  <FormattedMessage id="patient.extra-infor-doctor.detail" />
                </span>
              </div>
            )}

            {isShowDetailInfor === true && (
              <>
                <div className="title-price">
                  <FormattedMessage id="patient.extra-infor-doctor.price" />
                </div>
                <div className="detail-infor">
                  <div className="price">
                    <span className="left">
                      <FormattedMessage id="patient.extra-infor-doctor.price" />
                    </span>
                    <span className="right">
                      {extraInfor &&
                        extraInfor.priceTypeData &&
                        language === LANGUAGES.VI && (
                          <NumberFormat
                            className="currency"
                            value={extraInfor.priceTypeData.valueVi}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={" VND"}
                          />
                        )}
                      {extraInfor &&
                        extraInfor.priceTypeData &&
                        language === LANGUAGES.EN && (
                          <NumberFormat
                            className="currency"
                            value={extraInfor.priceTypeData.valueEn}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"$"}
                          />
                        )}
                    </span>
                  </div>
                  <div className="note">
                    <>
                      <span>
                        {extraInfor &&
                        extraInfor.note &&
                        language === LANGUAGES.VI
                          ? concat(
                              <FormattedMessage id="patient.extra-infor-doctor.notification-note" />,
                              extraInfor.note
                            )
                          : ""}

                        {extraInfor &&
                        extraInfor.note &&
                        language === LANGUAGES.EN
                          ? concat(
                              <FormattedMessage id="patient.extra-infor-doctor.notification-note" />,
                              extraInfor.note
                            )
                          : ""}
                      </span>
                    </>
                  </div>
                  <div className="payment">
                    <FormattedMessage id="patient.extra-infor-doctor.payment" />
                    <span>
                      {extraInfor &&
                      extraInfor.paymentTypeData &&
                      language === LANGUAGES.VI
                        ? extraInfor.paymentTypeData.valueVi
                        : ""}

                      {extraInfor &&
                      extraInfor.paymentTypeData &&
                      language === LANGUAGES.EN
                        ? extraInfor.paymentTypeData.valueEn
                        : ""}
                    </span>
                  </div>
                  <div className="hide-price">
                    <span onClick={() => this.showHideDetailInfor(false)}>
                      <FormattedMessage id="patient.extra-infor-doctor.hide-price" />
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtrainInfor);
