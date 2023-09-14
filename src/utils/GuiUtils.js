import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft, faChevronRight
} from '@fortawesome/free-solid-svg-icons';

import {
    Badge
} from 'reactstrap';

class GuiUtils {
    badgeColorByTxStatus(status) {

        var color;
        switch (status) {
            case "Posted": color = "success"; break;
            case "Settled": color = "primary"; break;
            case "Rejected": color = "info"; break;
            default: color = "warning";
        }

        return <Badge color={color}>{status}</Badge>;
    }

    badgeColorByBatchStatus(status) {

        var color;
        switch (status) {
            case "ACSP": color = "success"; break;
            case "ACSC": color = "primary"; break;
            case "RJCT": color = "info"; break;
            case "PNDG": color = "warning"; break;
            case "CANC": color = "light"; break;
            case "ACCP": color = "secondary"; break;
            default: color = "danger";
        }

        return <Badge color={color}>{status}</Badge>;
    }

    badgeColorByInstrStatus(status) {

        var color;
        switch (status) {
            case "Active": color = "success"; break;
            case "Cancelled": color = "secondary"; break;
            case "Rejected": color = "danger"; break;
            case "Waiting": color = "info"; break;
            default: color = "warning";
        }

        return <Badge color={color}>{status}</Badge>;
    }

    badgeColorByAuthInfo(status) {

        var color;
        switch (status) {
            case "AUTH": color = "success"; break;
            case "NAUT": color = "danger"; break;
            case "NOAN": color = "warning"; break;
            default: color = "warning";
        }

        return <Badge color={color}>{status}</Badge>;
    }

    renderCustomizedPieChartLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        if (percent >= 0.08)
            return (
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            );
    };

    badgeColorByQtbsStatus(status) {

        var color;
        switch (status) {
            case "CREATED": color = "primary"; break;
            case "APPROVED": color = "success"; break;
            case "DECLINE": color = "warning"; break;
            default: color = "warning";
        }

        return <Badge color={color}>{status}</Badge>;
    }

    badgeColorByOnOff(status) {

        var color;
        switch (status) {
            case true: color = "primary"; break;
            case false: color = "secondary"; break;
            default: color = "warning";
        }

        return <Badge color={color}>{status?"Bật":"Tắt"}</Badge>;
    }

    badgeColorByDsptStatus(status) {

        var color;
        switch (status) {
            case "PRCD": color = "success"; break;
            case "CLSD": color = "primary"; break;
            case "RJCT": color = "danger"; break;
            case "EXPI": color = "warning"; break;
            case "OPEN": color = "secondary"; break;
            default: color = "danger";
        }

        return <Badge color={color}>{status}</Badge>;
    }

    badgeColorByRptCamtStatus(status) {

        var color;
        switch (status) {
            case "SUCCESS": color = "success"; break;
            case "FAILURE": color = "danger"; break;
            case "NO": color = "secondary"; break;
            default: color = "warning";
        }

        return <Badge color={color}>{status}</Badge>;
    }

    badgeColorByRptCamtDeliverMethod(status) {

        var color;
        switch (status) {
            case "ONLINE": color = "primary"; break;
            case "OFFLINE": color = "secondary"; break;
            default: color = "warning";
        }

        return <Badge color={color}>{status}</Badge>;
    }
}

export default new GuiUtils();