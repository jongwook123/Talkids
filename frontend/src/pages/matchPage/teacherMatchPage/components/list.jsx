import { useState } from "react";

import * as S from "./style";
import { useSelector } from "react-redux";
import { TryGetGroup } from "apis/GroupPageAPIs";
import { useEffect } from "react";
import MatchApplyModal from "components/modals/matchapplymodal";
import LongButton1 from "components/buttons/longbutton1";
import { AcceptMeeting, RejectMeeting } from "apis/meetingPageAPIs";

export default function List(props) {
  const clickedData = props.clickedData;
  const clickedDate = props.clickedData.today;

  const token = useSelector((state) => state.user.accessToken);

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await TryGetGroup(token);
      setGroups([...result.response]);
    })();
  }, []);

  const acceptButtonClickHandler = (meetingJoinReqId) => {
    // e.preventDefault();

    AcceptMeeting(token, meetingJoinReqId)
  }

  const rejectButtonClickHandler = (meetingJoinReqId) => {
    // e.preventDefault();

    RejectMeeting(token, meetingJoinReqId)
  }



  return (
    <>
      <S.Listheader>
        {clickedDate && (
          <>
            {clickedDate} 's{" "}
            <p>
              {clickedData && clickedData.type === "mySchedules"
                ? "My Unmatched"
                : clickedData.type === "schedules"
                  ? "Unmatched"
                  : "My Matched"}
            </p>
          </>
        )}
      </S.Listheader>

      <S.ScheduleList>
        {clickedData.data &&
          clickedData.data.map((item, index) => (
            <li key={index}>
              {clickedData.type === "meetings" ? (
                <>
                  <p>
                    {item.groupRes.groupName} & {item.groupReq.groupName}
                  </p>
                  <p>
                    {item.meetingStart.slice(11, 16)} ~{" "}
                    {item.meetingEnd.slice(11, 16)}
                  </p>
                </>
              ) : (
                <>
                  <p>{item.group.groupName}</p>
                  <p>{item.group.teacher.school.schoolName}</p>
                  <p>{item.group.teacher.memberName}</p>
                  <p>
                    {item.meetingScheduleStart.slice(11, 16)} ~{" "}
                    {item.meetingScheduleEnd.slice(11, 16)}
                  </p>
                  {clickedData.type === "schedules" &&
                    (item.sended ? (
                      <S.ButtonWrapper3>
                        <LongButton1
                          props={{
                            text: "Cancel Request",
                          }}
                        />
                      </S.ButtonWrapper3>
                    ) : (
                      <S.ButtonWrapper3>
                        <MatchApplyModal
                          token={token}
                          groups={groups}
                          meetingScheduleId={item.meetingScheduleId}
                        />
                      </S.ButtonWrapper3>
                    ))}
                  {clickedData.type === "mySchedules" &&
                    item.reqs &&
                    item.reqs.map((req, reqIndex) => (
                      <>
                        <S.ButtonWrapper3 key={reqIndex}>
                          <p>{req.group.groupName} - teacher: {req.group.teacher.memberName}</p>
                          <LongButton1
                            props={{
                              text: "Accept",
                              callback: () => acceptButtonClickHandler(req.meetingJoinReqId),
                            }}
                          />
                          <LongButton1
                            props={{
                              text: "Reject",
                              callback: () => rejectButtonClickHandler(req.meetingJoinReqId),
                            }}
                          />
                        </S.ButtonWrapper3>
                      </>
                    )
                    )}
                </>
              )}
            </li>
          ))}
      </S.ScheduleList>
    </>
  );
}
