package com.ssafy.hifive.domain.fanmeeting.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;

@Repository
public interface FanmeetingRepository extends JpaRepository<Fanmeeting, Long>, FanmeetingCustomRepository {
	@Query("""
			select count(*) 
			from Fanmeeting f
			where f.creator.memberId = :creatorId
		""")
	long countByCreatorId(long creatorId);

	List<Fanmeeting> findByCreatorMemberId(long creatorId);

	List<Fanmeeting> findByCreatorMemberIdAndStartDateAfter(long creatorId, LocalDateTime currentTime);

	@Query("""
		SELECT f 
		FROM Fanmeeting f 
		LEFT JOIN FETCH f.timetable 
		WHERE f.fanmeetingId = :fanmeetingId
		""")
	Optional<Fanmeeting> findByIdWithTimetable(@Param("fanmeetingId") long fanmeetingId);

	@Query("""
		select f from Fanmeeting f
		where DATE(f.openDate) = CURRENT_DATE
	""")
	List<Fanmeeting> getActiveFanmeetingIds();
}
