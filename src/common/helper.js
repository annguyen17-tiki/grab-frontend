export const formatTime = (time) => {
    const d = new Date(time);
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
}

export const formatBookingStatus = (status) => {
    switch (status) {
        case 'new':
            return 'Mới'
        case 'confirm':
            return 'Đã xác nhận'
        case 'done':
            return 'Hoàn thành'
        case 'timeout':
            return 'Không có tài xế'
        case 'cancel':
            return 'Bị hủy'
        default:
            return 'N/A'
    }
}

export const formatVehicle = (vehicle) => {
    switch (vehicle) {
        case 'motor':
            return 'Xe gắn máy'
        case 'car4':
            return 'Xe ôtô 4 chỗ'
        case 'car7':
            return 'Xe ôtô 7 chỗ'
        default:
            return 'Không xác định'
    }
}

export const formatAccountName = (account) => {
    if (!account) return ''
    return `${account.firstname} ${account.lastname}`
}

export const formatRole = (role) => {
    switch (role) {
        case 'user':
            return 'Người Dùng'
        case 'driver':
            return 'Tài Xế'
        case 'admin':
            return 'Điều Phối Viên'
        default:
            return ''
    }
}