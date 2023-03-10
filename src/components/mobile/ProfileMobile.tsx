import React from 'react';
import {useNavigate} from "react-router-dom";
import colleges from "../utils/Colleges";
import dayjs, {Dayjs} from "dayjs";
import {post} from "../utils/Request";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import copy from "copy-to-clipboard";

const ProfileMobile = () => {

    const sexItem = [
        {
            label: "男",
            value: "男",
        },
        {
            label: "女",
            value: "女",
        },
    ]

    const techGroupItem = [
        {
            label: "软件组",
            value: "软件组",
        },
        {
            label: "硬件组",
            value: "硬件组",
        },
        {
            label: "机械组",
            value: "机械组",
        },
    ]

    const navigate = useNavigate();
    const collegeItem = colleges;

    const split: any = "·";
    const [birthday, setBirthday] = React.useState<Dayjs | null>(dayjs('1970-1-1'));
    const [name, setName] = React.useState("");
    const [id, setId] = React.useState("");
    const [session, setSession] = React.useState("");
    const [college, setCollege] = React.useState("");
    const [major, setMajor] = React.useState("");
    const [techGroup, setTechGroup] = React.useState("");
    const [telephone, setTelephone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [qq, setQq] = React.useState("");
    const [idCard, setIdCard] = React.useState("");
    const [sex, setSex] = React.useState("");
    const [nation, setNation] = React.useState("");
    const [foodHabit, setFoodHabit] = React.useState("");
    const [hometown, setHometown] = React.useState("");
    const [residence, setResidence] = React.useState("");
    const [highSchool, setHighSchool] = React.useState("");

    function validate() {
        if (!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(name)) {
            alert("姓名格式有问题， 应为2-20位汉字或包含英文标点：·");
            return false;
        }
        if (!/^\d{10}$/.test(id)) {
            alert("学号格式有误，应为10位数字");
            return false;
        }
        if (!/^\d{4}$/.test(session)) {
            alert("届次格式有误，应为4位数字");
            return false;
        }
        if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) {
            alert("邮箱格式有误，应为 xxx@xx.com");
            return false;
        }
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(telephone)) {
            alert("手机号码格式有误，应为 1开头;3,4,5,7,8作为第二位的11位数字");
            return false;
        }
        if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard)) {
            alert("身份证号格式有误，应为 15位一代身份证和18位二代身份证");
            return false;
        }
        if (foodHabit === "") {
            alert("饮食习惯不得为空，无禁忌请填无");
            return false;
        }
        if (birthday === dayjs('1970-1-1')) {
            alert("请检查生日信息，1970-1-1 是不被允许的日期");
            return false;
        }
        if (college === "") {
            alert("学院不得为空，请选择自己的学院");
            return false;
        }
        if (major === "") {
            alert("专业不得为空，请选择自己的专业，没有请填 DL");
            return false;
        }
        if (sex === "") {
            alert("性别不得为空，请选择自己的性别");
            return false;
        }
        if (college === "") {
            alert("学院不得为空，请选择自己的学院");
            return false;
        }
        if (techGroup === "") {
            alert("技术组别不得为空，请选择自己的技术组别");
            return false;
        }
        if (!/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,32}$/.test(hometown)) {
            alert("户籍格式有误，应为 2-32位汉字");
            return false;
        }
        if (!/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,32}$/.test(residence)) {
            alert("常驻地格式有误，应为 2-32位汉字");
            return false;
        }
        if (!/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,32}$/.test(highSchool)) {
            alert("生源高中格式有误，应为 2-32位汉字");
            return false;
        }
        if (!/^[\u4E00-\u9FA5\uf900-\ufa2d]{1,4}$/.test(nation)) {
            alert("民族格式有误，应为 1-4位汉字");
            return false;
        }
        if (!/^[1-9]\d{4,12}$/.test(qq)) {
            alert("QQ格式有误，应为 4 - 12位数字");
        }
        return true;
    }

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 200,
                width: 250,
            },
        },
    };

    function init() {
        post("/member/get-member",
            localStorage.getItem("v5_token")
        ).then(((res: any) => {
            if (res.status === 200) {
                setQq(res.data.qqId);
                setId(res.data.id);
                setName(res.data.name);
                setTelephone(res.data.telephone);
                setEmail(res.data.email);
                setIdCard(res.data.idCard);
                setCollege(res.data.college);
                setMajor(res.data.major);
                setHometown(res.data.homeTown);
                setResidence(res.data.residence);
                setSession(res.data.session);
                setHighSchool(res.data.highSchool);
                setFoodHabit(res.data.foodHabit);
                setBirthday(res.data.birthday);
                setTechGroup(res.data.techGroup);
                if (res.data.sex === "FEMALE") {
                    setSex("女");
                } else {
                    setSex("男");
                }
                if (res.data.techGroup === "MECHANIC") {
                    setTechGroup("机械组");
                } else if (res.data.techGroup === "HARDWARE") {
                    setTechGroup("硬件组");
                } else {
                    setTechGroup("软件组");
                }
                setNation(res.data.nation
                    .substring(0, res.data.nation.length - 1));
            }
        }))
    }

    React.useEffect(() => {
        init();
    }, []);

    function onClickConfirm() {
        if (!validate()) {
            return;
        }
        post("/member/update", {
            id: id,
            name: name,
            telephone: telephone,
            email: email,
            qq: qq,
            idCard: idCard,
            college: college,
            major: major,
            hometown: hometown,
            residence: residence,
            session: session,
            highSchool: highSchool,
            foodHabit: foodHabit,
            birthday: birthday,
            techGroup: techGroup,
            sex: sex,
            nation: nation,
        }).then(((res: any) => {
            if (res.status === 200) {
                if (res.data.msg === "success") {
                    alert("修改成功");
                } else {
                    alert(res.data.msg);
                }
            }
        }))
    }

    function handleSetProfile() {

    }

    function handleClose() {

    }

    // @ts-ignore
    return (

        <Box>
            <Typography
                align="center"
                sx={{
                    fontFamily: "黑体",
                    fontSize: 20,
                    fontWeight: "bold",
                    height: 32,
                    marginTop: 2
                }}
            >我的个人信息</Typography>
            <Stack>
                <TextField
                    disabled={true}
                    aria-readonly={true}
                    id="outlined-required"
                    label="学号"
                    sx={{
                        margin: 4,
                        height: 30,
                    }}
                    value={id}
                />
                <Button
                    sx={{
                        margin: 3,
                        fontWeight: "bold",
                    }}
                    variant="outlined"
                    onClick={() => {
                        navigate("/homepage/md?fileLink=Privacy.md&darkMode=false");
                    }}
                > V5 隐私政策
                </Button>


                <Button
                    sx={{
                        marginX: 3,
                        marginTop: 1,
                        textAlign: "center",
                        fontSize: 14
                    }}
                    variant="text"
                    onClick={() => {
                        copy(split)
                    }}
                > 点击复制少数民族姓名分隔标点
                </Button>
                <TextField
                    required
                    id="outlined-required"
                    label="姓名"
                    sx={{
                        marginX: 3,
                        marginBottom: 6,
                        height: 30
                    }}
                    value={name}
                    onChange={(event: any) => {
                        setName(event.target.value);
                    }}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="届次"
                    sx={{
                        marginX: 3,
                        height: 30
                    }}
                    value={session}
                    onChange={(event: any) => {
                        setSession(event.target.value);
                    }}
                />


                <FormControl
                    sx={{
                        width: 225,
                        marginX: 3,
                    }}
                >
                    <InputLabel id="demo-multiple-name-label">
                        学院
                    </InputLabel>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={college}
                        onChange={(event) => {
                            setCollege(event.target.value);
                        }}
                        input={<OutlinedInput label="Name"/>}
                        MenuProps={MenuProps}
                    >
                        {collegeItem.map((option) => (
                            <MenuItem
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    required
                    id="outlined-required"
                    label="专业（没有填DL）"
                    sx={{
                        marginX: 3,
                        height: 30,
                    }}
                    value={major}
                    onChange={(event: any) => {
                        setMajor(event.target.value);
                    }}
                />

                <TextField
                    id="outlined-select-currency"
                    select
                    label="技术组别"
                    sx={{
                        marginTop: 3,
                        width: 225,
                        marginX: 3,
                    }}
                    value={techGroup}
                    onChange={(event: any) => {
                        setTechGroup(event.target.value);
                    }}
                >
                    {techGroupItem.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}

                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    required
                    id="outlined-required"
                    label="电话"
                    sx={{
                        margin: 3,
                        height: 30
                    }}
                    value={telephone}
                    onChange={(event: any) => {
                        setTelephone(event.target.value);
                    }}
                />

                <TextField
                    required
                    id="outlined-required"
                    label="邮箱"
                    sx={{
                        margin: 3,
                        height: 30
                    }}
                    value={email}
                    onChange={(event: any) => {
                        setEmail(event.target.value);
                    }}
                />

                <TextField
                    required
                    id="outlined-required"
                    label="QQ"
                    sx={{
                        margin: 3,
                        height: 30
                    }}
                    value={qq}
                    onChange={(event: any) => {
                        setQq(event.target.value);
                    }}
                />

                <TextField
                    id="outlined-required"
                    label="身份证号（用于报名比赛）"
                    sx={{
                        margin: 3,
                        height: 30,
                        width: 250,
                    }}
                    value={idCard}
                    onChange={(event: any) => {
                        setIdCard(event.target.value);
                    }}
                />

                <TextField
                    id="outlined-select-currency"
                    select
                    label="性别"
                    sx={{
                        margin: 3,
                        width: 130,
                        marginX: 3,
                    }}
                    value={sex}
                    onChange={(event: any) => {
                        setSex(event.target.value);
                    }}
                >
                    {sexItem.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}

                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    required
                    id="outlined-required"
                    label="民族"
                    value={nation}
                    onChange={(event: any) => {
                        setNation(event.target.value);
                    }}
                />

                <Typography
                    sx={{
                        textAlign: "left",
                        marginTop: 2,
                        marginLeft: 2,
                        fontSize: 20,
                    }}
                >族</Typography>


                <TextField
                    required
                    id="outlined-required"
                    label="饮食习惯（无禁忌填“正常”）"
                    sx={{
                        marginBottom: 3,
                        marginX: 3,
                        height: 30
                    }}
                    value={foodHabit}
                    onChange={(event: any) => {
                        setFoodHabit(event.target.value);
                    }}
                />


                <TextField
                    required
                    id="outlined-required"
                    label="籍贯(xx省xx市)"
                    sx={{
                        margin: 3,
                        height: 30
                    }}
                    value={hometown}
                    onChange={(event: any) => {
                        setHometown(event.target.value);
                    }}
                />


                <TextField
                    required
                    id="outlined-required"
                    label="常住地(xx省xx市)"
                    sx={{
                        margin: 3,
                        height: 30
                    }}
                    value={residence}
                    onChange={(event: any) => {
                        setResidence(event.target.value);
                    }}
                />


                {/*<DatePicker*/}
                {/*    label="出生日期"*/}
                {/*    value={birthday}*/}
                {/*    onChange={(newValue:any) => {*/}
                {/*        if (newValue.toString() === "Invalid Date") {*/}
                {/*            alert("请点击图标更改此栏位");*/}
                {/*        }*/}
                {/*        setBirthday(newValue.format('YYYY-MM-DD'));*/}
                {/*    }}*/}
                {/*/>*/}


                <TextField
                    required
                    id="outlined-required"
                    label="生源高中"
                    sx={{
                        marginY: 3,
                        height: 30
                    }}
                    value={highSchool}
                    onChange={(event: any) => {
                        setHighSchool(event.target.value);
                    }}
                />

            </Stack>
            <Button onClick={handleSetProfile}>
                确认修改
            </Button>
            <Button onClick={handleClose}>
                返回
            </Button>
        </Box>

    );
};

export default ProfileMobile;
