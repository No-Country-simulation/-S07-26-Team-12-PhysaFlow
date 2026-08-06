export default function Loss({
    from,
    to,
    y,
    x = 24
}) {

    const lost = from - to;

    return (

        <>

            <text
                x={240}
                y={y + 30}
                fontFamily="IBM Plex Mono"
                fontSize="12"
                fill="#D4AF37"
            >
                Pérdida {lost} MW
            </text>

        </>

    );

}