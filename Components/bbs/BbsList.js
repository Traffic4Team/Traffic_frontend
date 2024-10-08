import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";

function BbsList() {
    const [bbsList, setBbsList] = useState([]);
    const [choiceVal, setChoiceVal] = useState("");
    const [searchVal, setSearchVal] = useState("");
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);
    let navigate = useNavigate();

    const getBbsList = async (choice, search, page) => {
        try {
            const resp = await axios.get("/bbs", { params: { choice: choice, search: search, page: page } });
            console.log("[BbsList.js] useEffect() success :D");
            console.log(resp.data);
            setBbsList(resp.data.bbsList);
            setTotalCnt(resp.data.pageCnt);
        } catch (err) {
            console.log("[BbsList.js] useEffect() error :<");
            console.log(err);
        }
    };

    useEffect(() => {
        getBbsList("", "", 1);
    }, []);

    const changeChoice = (event) => {
        setChoiceVal(event.target.value);
    };

    const changeSearch = (event) => {
        setSearchVal(event.target.value);
    };

    const search = () => {
        console.log("[BbsList.js searchBtn()] choiceVal=" + choiceVal + ", searchVal=" + searchVal);
        navigate("/bbslist");
        getBbsList(choiceVal, searchVal, 1);
    };

    const changePage = (page) => {
        setPage(page);
        getBbsList(choiceVal, searchVal, page);
    };

    return (
        <div>
            <table className="search">
                <tbody>
                    <tr>
                        <td>
                            <select className="custom-select" value={choiceVal} onChange={changeChoice}>
                                <option>검색 옵션 선택</option>
                                <option value="title">제목</option>
                                <option value="content">내용</option>
                                <option value="writer">작성자</option>
                            </select>
                        </td>
                        <td>
                            <input type="text" className="form-control" placeholder="검색어" value={searchVal} onChange={changeSearch} />
                        </td>
                        <td>
                            <button type="button" className="btn btn-outline-secondary" onClick={search}>
                                <i className="fas fa-search"></i> 검색
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="col-1">번호</th>
                        <th className="col-8">제목</th>
                        <th className="col-3">작성자</th>
                    </tr>
                </thead>

                <tbody>
                    {bbsList.map(function (bbs, idx) {
                        if (bbs.del === 0) {
                            return <TableRow obj={bbs} key={idx} cnt={idx + 1} />;
                        }
                        return null;
                    })}
                </tbody>
            </table>

            <Pagination
                className="pagination"
                activePage={page}
                itemsCountPerPage={10}
                totalItemsCount={totalCnt}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={changePage}
            />

            <div className="my-5 d-flex justify-content-center">
                <Link className="btn btn-outline-secondary" to="/bbswrite">
                    <i className="fas fa-pen"></i> &nbsp; 글쓰기
                </Link>
            </div>
        </div>
    );
}

function TableRow(props) {
    const bbs = props.obj;

    return (
        <tr>
            <th>{props.cnt}</th>
            {bbs.del === 0 ? (
                <>
                    <td>
                        <Arrow depth={bbs.depth}></Arrow> &nbsp; { /* 답글 화살표 */}
                        <Link to={{ pathname: `/bbsdetail/${bbs.seq}` }}>
                            <span className="underline bbs-title">{bbs.title} </span> { /* 게시글 제목 */}
                        </Link>
                    </td>
                    <td>{bbs.id}</td>
                </>
            ) : (
                <td>
                    <span className="del-span">⚠️ 이 글은 작성자에 의해 삭제됐습니다.</span>
                </td>
            )}
        </tr>
    );
}

const tap = "\u00A0\u00A0\u00A0\u00A0";
function Arrow(props) {
    const depth = props.depth;

    if (depth === 0) {
        return null;
    }

    const taps = [];
    for (let i = 0; i < depth; i++) {
        taps.push(tap);
    }

    return (
        <>
            {taps} <i className="fas fa-long-arrow-alt-right"></i>
        </>
    );
}

export default BbsList;