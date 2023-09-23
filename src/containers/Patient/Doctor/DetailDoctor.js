import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailDoctor.scss";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import { ReactFragment } from "react";
import { LANGUAGES } from "../../../utils";
import { getDetailInforDoctorService } from "../../../services/userService";
import HomeHeader from "../../HomePage/HomeHeader";
import Lightbox from "react-image-lightbox";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtrainInfor from "./DoctorExtraInfor";
import HomeFooter from "../../HomePage/HomeFooter";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,

      detailDoctor: [],
      currentDoctorId: -1,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });

      let res = await getDetailInforDoctorService(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  openPreviewImage = () => {
    if (!this.state.detailDoctor.image) return;
    this.setState({
      isOpen: true,
    });
  };

  render() {
    //console.log("HoiDanIt check state: ", this.state);

    let { language } = this.props;
    let { detailDoctor } = this.state;
    let nameVi = "",
      nameEn = "";

    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }
    return (
      <React.Fragment>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              onClick={() => this.openPreviewImage()}
              style={{
                backgroundImage: `url(${
                  detailDoctor && detailDoctor.image ? detailDoctor.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.description && (
                    <span>{detailDoctor.Markdown.description}</span>
                  )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule doctorIdFromParent={this.state.currentDoctorId} />
            </div>
            <div className="content-right">
              <DoctorExtrainInfor
                doctorIdFromParent={this.state.currentDoctorId}
              />
            </div>
          </div>
          <div className="detail-infor-doctor">
            {detailDoctor &&
              detailDoctor.Markdown &&
              detailDoctor.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailDoctor.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
        </div>
        <div className="comment-doctor"></div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.detailDoctor.image}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
        {/* <HomeFooter /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
